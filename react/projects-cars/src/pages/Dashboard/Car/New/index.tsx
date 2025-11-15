import { useForm } from "react-hook-form";
import { Container } from "../../../../components/Cointainer";
import { HeaderDashboard } from "../../../../components/Header/dashboard";
import { NewCarFormData, newCarSchema } from "../../../../types/NewCar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../../../components/Form/Label";
import { Input } from "../../../../components/Form/Input";
import { FormGroup } from "../../../../components/Form/FormGroup";
import { FiUpload } from "react-icons/fi";

export function NewCar() {
    const { register, handleSubmit, formState: { errors } } = useForm<NewCarFormData>({
        resolver: zodResolver(newCarSchema),
        mode: "onChange",
    });

    function handleNewCar(data: NewCarFormData) {
        console.log(data);
    }

    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Novo Carro'} />

            <div className="w-full p-4">
                <form className="space-y-4" onSubmit={handleSubmit(handleNewCar)}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <FormGroup className="md:col-span-6">
                            <button className="cursor-pointer border-2 w-48 h-32 rounded-md flex flex-col items-center justify-center p-4 relative">
                                <div className="absolute">
                                    <FiUpload size={30} color="#fff" />
                                </div>

                                <div className="">
                                    <input type="file" name="image" accept="image/*" className="opacity-0 cursor-pointer absolute left-0 w-full h-full" title="Imagem"/>                                
                                </div>
                            
                            </button>                            
                        </FormGroup>                        

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