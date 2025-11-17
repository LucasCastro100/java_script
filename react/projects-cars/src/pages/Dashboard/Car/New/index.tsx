import { useForm } from "react-hook-form";
import { Container } from "../../../../components/Cointainer";
import { HeaderDashboard } from "../../../../components/Header/dashboard";
import { NewCarFormData, newCarSchema } from "../../../../types/NewCar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../../../components/Form/Label";
import { Input } from "../../../../components/Form/Input";
import { FormGroup } from "../../../../components/Form/FormGroup";
import { FiTrash, FiUpload } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../../services/firebaseConection";
import { toast } from "react-toastify";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/Auth";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { ca } from "zod/locales";
import { update } from "firebase/database";

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

export function NewCar() {
    const { user } = useContext(AuthContext);
    const [carImages, setCarImages] = useState<ImageItemProps[]>([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewCarFormData>({
        resolver: zodResolver(newCarSchema),
        mode: "onChange",
    });

    async function handleFile(event: ChangeEvent<HTMLInputElement>) {
        const image = event.target.files?.[0];
        if (image) {
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpdate(image)
            } else {
                toast.error("Envie uma imagem do tipo PNG ou JPEG");
                event.target.value = '';
            }
        } else {
            toast.error("Nenhum arquivo selecionado");
        }
    }

    async function handleUpdate(image: File) {
        if (!user?.uid) {
            return
        }

        const currentUid = user.uid;
        const imageUid = uuidV4();
        const uploadRef = ref(storage, `images/${currentUid}/${imageUid}`);

        uploadBytes(uploadRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                toast.success("Imagem enviada com sucesso");
                const imageItem: ImageItemProps = {
                    uid: currentUid,
                    name: imageUid,
                    previewUrl: URL.createObjectURL(image),
                    url: url
                };

                setCarImages((images) => [...images, imageItem]);
            });
        })
    }

    async function handleDeleteImagem(item: ImageItemProps) {
        const image = ref(storage, `images/${item.uid}/${item.name}`);
        await deleteObject(image).then(() => {
            setCarImages(carImages.filter((image) => image.uid !== item.uid));
            toast.success("Imagem deletada com sucesso!");
        }).catch((error) => {
            console.log("Erro ao deletar imagem: ", error);
            toast.error("Erro ao deletar imagem!");
        });
    }

    async function handleNewCar(data: NewCarFormData) {
        if (carImages.length === 0) {
            toast.error("Envie ao menos uma imagem do carro");
            return;
        }

        const carListImages = carImages.map((car) => {
            return {
                uid: car.uid,
                name: car.name,
                url: car.url
            }
        });

        await addDoc(collection(db, "cars"), {
            name: data.name,
            model: data.model,
            year: data.year,
            km: data.km,
            whatsapp: data.whatsapp,
            price: data.price,
            city: data.city,
            description: data.description,
            owner: user?.name, // Nome do usuário logado
            uid: user?.uid, // UID do usuário logado
            createdAt: new Date(),
            updatedAt: null,
            images: carListImages
        })
            .then(() => {
                toast.success("Carro cadastrado com sucesso!");
                setCarImages([])
                reset();
            })
            .catch((error) => {
                console.log("Erro ao cadastrar novo carro: ", error);
                toast.error("Erro ao cadastrar novo carro");
            })
    }

    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Novo Carro'} />

            <div className="w-full p-4 space-y-4">
                <div className="flex flex-row md:col-span-6">
                    <button className="cursor-pointer border-2 w-48 h-32 rounded-md flex flex-col items-center justify-center p-4 relative">
                        <div className="absolute">
                            <FiUpload size={30} color="#fff" />
                        </div>

                        <div className="">
                            <input type="file" name="image" accept="image/*" className="opacity-0 cursor-pointer absolute left-0 w-full h-full" title="Adicionar Imagem" onChange={handleFile} />
                        </div>
                    </button>

                    {carImages.length > 0 && (
                        <div className="flex flex-row">
                            {carImages.map((image) => (
                                <div key={image.name} className="w-48 h-32 rounded-md overflow-hidden ml-4 relative">
                                    <button className="absolute right-2 top-2 bg-white p-2 rounded-full cursor-pointer" onClick={() => handleDeleteImagem(image)}><FiTrash size={20} color="#000" /></button>
                                    <img src={image.previewUrl} alt="Imagem do carro" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleNewCar)}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <FormGroup className="md:col-span-6 lg:col-span-4">
                            <Label htmlFor="name" text="Nome do Carro" />
                            <Input type="text" name="name" placeholder="Ex: Onix 1.0" error={errors.name?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="model" text="Modelo" />
                            <Input type="text" name="model" placeholder="Ex: Onix 1.0 Flex LS Manual" error={errors.model?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="year" text="Ano" />
                            <Input type="text" name="year" placeholder="Ex: 2015/2016" error={errors.year?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="km" text="Quilometragem" />
                            <Input type="text" name="km" placeholder="Ex: 24000" error={errors.km?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="whatsapp" text="Telefone / WhatsApp" />
                            <Input type="text" name="whatsapp" placeholder="Ex: 034998765432" error={errors.whatsapp?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="price" text="Preço" />
                            <Input type="text" name="price" placeholder="Ex: 486524" error={errors.price?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-3 lg:col-span-2">
                            <Label htmlFor="city" text="Cidade" />
                            <Input type="text" name="city" placeholder="Ex: Uberaba - MG" error={errors.city?.message} register={register} />
                        </FormGroup>

                        <FormGroup className="md:col-span-6">
                            <Label htmlFor="description" text="Descrição" />
                            <textarea name="description" id="description" cols="15" rows="10" className="w-full rounded-md px-2 border-2 focus:border-gray-500" {...register("description")}></textarea>
                            {errors.description && <p className="text-red-800 text-sm mt-1">{errors.description.message}</p>}
                        </FormGroup>
                    </div>

                    <button type="submit" className="w-full h-10 bg-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer">Cadastrar Carro</button>
                </form>
            </div>
        </Container>
    );
}