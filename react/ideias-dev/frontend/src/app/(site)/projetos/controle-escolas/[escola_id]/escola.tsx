'use client'

import { Modal } from "@/components/site/modal";
import { useLocalStorage } from "@/hooks/loja/useLocalStorage";
import { School, Class } from "@/types/controle-escolas/school";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRandomId } from "@/hooks/id-random";

export default function EscolaPage() {
  const { escola_id } = useParams();
  const router = useRouter();
  const [schools, setSchools] = useLocalStorage<School[]>("schools", []);

  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const [editName, setEditName] = useState("");
  const [className, setClassName] = useState("");

  const school = schools.find((item) => item.id === escola_id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Editar escola
  const handleEdit = () => {
    const updated = schools.map((item) =>
      item.id === escola_id ? { ...item, name: editName } : item
    );
    setSchools(updated);
    setIsEditOpen(false);
  };

  // Excluir escola
  const handleDelete = () => {
    const updated = schools.filter((item) => item.id !== escola_id);
    setSchools(updated);
    setIsDeleteOpen(false);
    router.push("/projetos/controle-escolas");
  };

  // Adicionar turma
  const handleAddClass = () => {
    if (!className.trim()) return;

    const newClass: Class = {
      id: useRandomId(6),
      name: className.trim()
    };

    const updated = schools.map((s) =>
      s.id === escola_id
        ? { ...s, classes: [...(s.classes || []), newClass] } // ✅
        : s
    );

    setSchools(updated);
    setClassName("");
    setIsAddClassOpen(false);
  };

  return (
    <div className="p-4">
      {loading ? (
        <p className="font-bold text-center text-gray-500 animate-pulse transition-all">
          Carregando...
        </p>
      ) : !school ? (
        <p className="font-bold text-center text-red-700">Escola não encontrada.</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-end mb-6">
            <button
              onClick={() => {
                setEditName(school.name);
                setIsEditOpen(true);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Editar Escola
            </button>

            <button
              onClick={() => setIsDeleteOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Excluir Escola
            </button>

            <button
              onClick={() => setIsAddClassOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cadastrar Turma
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Escola: {school.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {school.classes && school.classes.length > 0 ? (
              school.classes.map((cls) => (
                <Link
                  key={cls.id}
                  href={`/projetos/controle-escolas/${school.id}/${cls.id}`}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
                >
                  <h3 className="font-bold text-lg">{cls.name}</h3>
                </Link>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-600 font-semibold">
                Nenhuma turma cadastrada.
              </p>
            )}
          </div>
        </>
      )}

      {/* Modal Editar */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Editar Escola"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Excluir */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Excluir Escola"
      >
        <p>Tem certeza que deseja excluir a escola <b>{school?.name}</b>?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </Modal>

      {/* Modal Cadastrar Turma */}
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title="Cadastrar Turma"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Nome da turma"
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsAddClassOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddClass}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
