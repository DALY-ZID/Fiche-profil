import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Details from './Details'
import Image from 'next/image';
export default function AddProfile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [img, setImg] = useState("");
  const [Equipe, setEquipe] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !job || !img || !Equipe) {
      alert("Svp remplir tous les champs.");
      return;
    }

    const newProfile = {
      name,
      email,
      job,
      img,
      Equipe
    };

    try {
      const res = await axios.post("http://localhost:3001/profiles", newProfile);
      router.back("/");
    } catch (error) {
      console.error(error);
      alert("Erreur !");
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="w-1/2 border border-gray-300 p-20 rounded shadow-md">
      <Image src="/assets/images/logo_sifast.png" alt="Logo Sifast" width={150} height={100} style={{ marginLeft: '100px',marginTop:'auto' }} />

        <h2 className="text-center text-black font-sans italic">Ajouter un nouveau Profil</h2>

        <form onSubmit={handleSubmit} className="grid gap-3">

          <div className="grid gap-3">
            <div className="col-sm-12 p-2">
              <input
                className="form-control"
                placeholder="Nom"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-sm-12 p-2">
              <input
                className="form-control"
                placeholder="E-mail"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-sm-12 p-2">
              <input
                className="form-control"
                placeholder="Poste"
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              
            </div>

            <div className="col-sm-12 p-2">
              <input
                className="form-control"
                placeholder="Super Viseur"
                type="text"
                value={Equipe}
                onChange={(e) => setEquipe(e.target.value)}
              />
              
            </div>
            <div className="col-sm-12 p-2">
              <input
                className="form-control"
                placeholder="Image URL"
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-12 p-2">{img ? <img src={img} alt={img} className="w-16" /> : null}</div>

          <div className="col-sm-12 p-2">
          <button className="bg-orange-500 text-white w-full py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300">
  Enregistrer
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
