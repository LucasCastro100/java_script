'use client';

import { useState } from "react";

export const ContatoForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    urlDomain: "",
    desc: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "O nome é obrigatório.";
    if (!form.email) newErrors.email = "O email é obrigatório.";
    if (!form.phone) newErrors.phone = "O telefone é obrigatório.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    console.log("Enviando formulário:", form);
    // aqui você poderia fazer um fetch/axios para sua API
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {/* Nome */}
        <div className="">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Telefone */}
        <div className="">
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Domínio */}
        <div className="">
          <label htmlFor="domain" className="block font-medium text-gray-700">
            Domínio (SIM ou NÃO)
          </label>
          <input
            id="domain"
            name="domain"
            type="text"
            value={form.domain}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* URL */}
        <div className="">
          <label htmlFor="urlDomain" className="block font-medium text-gray-700">
            URL
          </label>
          <input
            id="urlDomain"
            name="urlDomain"
            type="text"
            value={form.urlDomain}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Descrição */}
        <div className="">
          <label htmlFor="desc" className="block font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="desc"
            name="desc"
            rows={5}
            value={form.desc}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};
