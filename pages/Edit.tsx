// Import necessary modules and components
import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import jsonData from '../../Stage_Perfectionnement/backend json/sifastdb.json';
import { useRouter } from 'next/router';
import { Typography, Avatar, Box, Grid, Stack, TextField, FormControlLabel, Input, Checkbox, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import BaseCard from './app/(DashboardLayout)/form-component/shared/BaseCard';
import {Chip} from "@mui/material";
import Image from 'next/image';


// Define the interface for profile data
interface ProfileData {
  name: string;
  email: string;
  job: string;
  img: string;
  experiences: ExperienceData[];
  formations: FormationData[];
  competences : CompetenceData[];
  point_fort : PointFortData[];
  langues : LangueData[];
}

interface ExperienceData {
  startDate: string;
  endDate: string;
  mission: string;
  companyName: string;
  projet: string;
  description:string;
  taches:string;
  environnement:string;
}

interface FormationData {
  startDate: string;
  endDate: string;
  diplome: string;
  companyName: string;
}

interface CompetenceData {
  name: string
}
interface PointFortData {
  name: string
}
interface LangueData {
  name: string
}
const Forms: React.FC = () => {

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [isEditing3, setIsEditing3] = useState(false);
  const [isEditing4, setIsEditing4] = useState(false);

  const initialExperienceData: ExperienceData = {
    startDate: '',
    endDate: '',
    mission: '',
    companyName: '',
    projet: '',
    description: '',
    taches: '',
    environnement:'',
    };

  const initialFormationData: FormationData = {
    startDate: '',
    endDate: '',
    diplome: '',
    companyName: ''
    };
  const initialCompetenceData: CompetenceData = {
    name: ''
  };

  const initialPointFortData: PointFortData = {
    name: ''
  };

  const initialLangueData: LangueData = {
    name: ''
  };
  const [experienceData, setExperienceData] = useState<ExperienceData>(initialExperienceData);
  const [profileExperiences, setProfileExperiences] = useState<ExperienceData[]>([]);
  const [addedExperiences, setAddedExperiences] = useState<ExperienceData[]>([]);
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("Email");
  const [phone, setPhone] = useState("Télephone");
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [isCheckboxChecked1, setCheckboxChecked1] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  

  const [formationData, setFormationData] = useState<FormationData>(initialFormationData);
  const [profileFormations, setProfileFormations] = useState<FormationData[]>([]);
  const [addedFormations, setAddedFormations] = useState<FormationData[]>([]);


  const [competenceData, setCompetenceData] = useState<CompetenceData>(initialCompetenceData);
  const [profileCompetences, setProfileCompetences] = useState<CompetenceData[]>([]);
  const [addedCompetences, setAddedCompetences] = useState<CompetenceData[]>([]);
  

  const [pointFortData, setPointFortData] = useState<PointFortData>(initialPointFortData);
  const [profilePointFort, setProfilePointFort] = useState<PointFortData[]>([]);
  const [addedPointFort, setAddedPointFort] = useState<PointFortData[]>([]);

  const [langueData, setLangueData] = useState<LangueData>(initialLangueData);
  const [profileLangues, setProfileLangue] = useState<LangueData[]>([]);
  const [addedLangues, setAddedLangues] = useState<LangueData[]>([]);


  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [poste, setPoste] = useState("");
  const [img, setImg] = useState("");


  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
        const data: ProfileData = response.data;
        setProfileData(data);

        // Mettre à jour les expériences récupérées depuis la profile data
        setProfileExperiences(data.experiences || []);
        // Mettre à jour les formations récupérées depuis la profile data
        setProfileFormations(data.formations || []);
         // Mettre à jour les competences récupérées depuis la profile data
        setProfileCompetences(data.competences || []);
         // Mettre à jour les points forts récupérées depuis la profile data
        setProfilePointFort(data.point_fort || []);
          // Mettre à jour les langues récupérées depuis la profile data
        setProfileLangue(data.langues || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (router.query.id) {
      fetchProfile();
    }
  }, [router.query.id]);
  
  // Save Experience in data base 
  const handleSaveExperience = async () => {
    if (
      experienceData.startDate &&
      experienceData.mission &&
      experienceData.companyName &&
      experienceData.description && 
      experienceData.taches &&
      experienceData.environnement &&
      experienceData.projet
    ) {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
        const existingExperiences = response.data.experiences ;

        setProfileExperiences(existingExperiences);

        const updatedExperiences = [...existingExperiences, experienceData];

        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          experiences: updatedExperiences,
        });

        setAddedExperiences(updatedExperiences);
        
        setExperienceData(initialExperienceData);
        setIsEditing3(false);
        alert('Expérience enregistrée avec succès.');
        router.reload();  
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur s\'est produite lors de la mise à jour du profil.');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  // Save Formation in data base 
  const handleSaveFormation = async () => {
    if (
      formationData.startDate &&
      formationData.diplome &&
      formationData.companyName 
    ) {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
        const existingFormations = response.data.formations ;

        setProfileFormations(existingFormations);

        const updatedFormations = [...existingFormations, formationData];

        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          formations: updatedFormations,
        });

        setAddedFormations(updatedFormations);

        setFormationData(initialFormationData);
        setIsEditing4(false);
        alert('Formation enregistrée avec succès.');
        router.reload(); 
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur s\'est produite lors de la mise à jour du profil.');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  // Save Competence in data base 
    const handleSaveCompetence = async () => {
      if (competenceData.name.trim() !== '') {
        try {
          const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
          const existingCompetences = response.data.competences ;
          setProfileCompetences(existingCompetences);
          // Mettez à jour les compétences existantes avec la nouvelle compétence
          const updatedCompetences = [...existingCompetences, competenceData];
    
          // Envoyez une requête pour mettre à jour les compétences sur le serveur
          await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
            competences: updatedCompetences,
          });
    
          // Mettez à jour l'état local avec les compétences mises à jour
          setAddedCompetences(updatedCompetences);
    
          // Réinitialisez les données de compétence pour le prochain ajout
          setCompetenceData(initialCompetenceData);
          setIsEditing(false);
          alert('Compétence enregistrée avec succès.');
          router.reload(); 
        } catch (error) {
          console.error('Erreur lors de la mise à jour du profil:', error);
          alert('Une erreur s\'est produite lors de la mise à jour du profil.');
        }
      } 
    };
    

    // Save Point Fort in data base 
    const handleSavePointFort = async () => {
      if (pointFortData.name.trim() !== '') {
        try {
          const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
          const existingPointsForts = response.data.point_fort;
    
          const updatedPointsForts = [...existingPointsForts, pointFortData];
    
          await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
            point_fort: updatedPointsForts,
          });
    
          setAddedPointFort(updatedPointsForts);
    
          setPointFortData(initialPointFortData);
          setIsEditing2(false);
          alert('Point Fort enregistrée avec succès.');
          router.reload();  

        } catch (error) {
          console.error('Erreur lors de la mise à jour du profil:', error);
          alert('Une erreur s\'est produite lors de la mise à jour du profil.');
        }
      } 
    };

       // Save Language in data base 
      const handleSaveLangue = async () => {
        if (langueData.name.trim() !== '') {
          try {
            const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
            const existingLangues = response.data.langues;
      
            const updatedLangues = [...existingLangues, langueData];
      
            await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
              langues: updatedLangues,
            });
      
            setAddedLangues(updatedLangues);
      
            setLangueData(initialLangueData);
            setIsEditing1(false);
            alert('Langue enregistrée avec succès.');
            router.reload(); 
          } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            alert('Une erreur s\'est produite lors de la mise à jour du profil.');
          }
        } 
      };
  // Delete Experience in data base 
  const handleDeleteExperience = async (index: number) => {
    try {
      const updatedExperiences = [...profileExperiences];
      const deletedExperience = updatedExperiences.splice(index, 1)[0];
  
      setAddedExperiences(updatedExperiences);
  
      await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        experiences: updatedExperiences.filter((_, i) => i !== index), // Remove the deleted experience
      });
      setExperienceData(initialExperienceData);
      alert('Expérience supprimée avec succès sur le serveur.');
      router.reload();  
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'expérience sur le serveur:', error);
      alert('Une erreur s\'est produite lors de la suppression de l\'expérience sur le serveur.');
    }
  };
  
    // Delete formation in data base 
    const handleDeleteFormation = async (index: number) => {
      try {
        const updatedFormations = [...profileFormations];
        const deletedFormation = updatedFormations.splice(index, 1)[0];
    
        // Update the local state with the modified experiences
        setAddedFormations(updatedFormations);
    
        // Send a request to the server to delete the experience using axios.patch
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          formations: updatedFormations.filter((_, i) => i !== index), // Remove the deleted experience
        });
        setFormationData(initialFormationData);
        alert('Formation supprimée avec succès sur le serveur.');
        router.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression de la formation sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la suppression de la formation sur le serveur.');
      }
    };
  
    const handleDeleteCompetence = async (index: number) => {
      try {
        const updatedCompetences = [...profileCompetences];
        const deletedCompetence = updatedCompetences.splice(index, 1)[0];

        setAddedCompetences(updatedCompetences);
    
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          competences: updatedCompetences.filter((_, i) => i !== index),
        });
    
        setCompetenceData(initialCompetenceData);
        alert('Compétence supprimée avec succès.');
        router.reload(); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la compétence sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la suppression de la compétence sur le serveur.');
      }
    };
    

    const handleDeletePointFort = async (index: number) => {
      try {
        // Copiez l'état actuel des points forts
        const updatedPointsForts = [...profilePointFort];
    
        // Supprimez le point fort à l'index donné
        updatedPointsForts.splice(index, 1);
    
        // Mettez à jour l'état local avec les points forts mis à jour
        setAddedPointFort(updatedPointsForts);
    
        // Mettez à jour le point fort dans la base de données en utilisant la requête PATCH
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          point_fort: updatedPointsForts,
        });
    
        // Réinitialisez les données du point fort dans le composant
        setPointFortData(initialPointFortData);
    
        alert('Point fort supprimé avec succès.');
        router.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression du point fort sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la suppression du point fort sur le serveur.');
      }
    };
    

    const handleDeleteLangue = async (index: number) => {
      try {
        const updatedLangues = [...profileLangues];
        const deletedLangue = updatedLangues.splice(index, 1)[0];

        setAddedLangues(updatedLangues);
    
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          langues: updatedLangues.filter((_, i) => i !== index),
        });
    
        setLangueData(initialLangueData);
        alert('Langue supprimée avec succès.');
        router.reload(); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la langue sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la suppression de la langue sur le serveur.');
      }
    };
  
  // Edit Experience in data base 
  const handleEditExperience = async (index: number) => {
    const experienceToEdit = profileExperiences[index];
    console.log(index);
    setExperienceData({ ...experienceToEdit });
    setIsEditing3(true);
    const updatedAddedExperiences = addedExperiences.map((exp, i) =>
      i === index ? { ...exp, ...experienceData } : exp
    );
    setProfileExperiences(updatedAddedExperiences);
    

    try {
      await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        experiences: updatedAddedExperiences,
      });
  
      console.log('Expérience modifiée avec succès sur le serveur.');
      
    } catch (error) {
      console.error('Erreur lors de la modification de l\'expérience sur le serveur:', error);
      alert('Une erreur s\'est produite lors de la modification de l\'expérience sur le serveur.');
    }
  };
  
   // Edit Formation in data base 
    const handleEditFormation = async (index: number) => {
      const formationToEdit = profileFormations[index];
      console.log(index);
      setFormationData({ ...formationToEdit });
      setIsEditing4(true);
      const updatedAddedFormations = addedFormations.map((form, i) =>
        i === index ? { ...form, ...formationData } : form
      );
      setProfileFormations(updatedAddedFormations);
  
      try {
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          formations: updatedAddedFormations,
        });
    
        console.log('Formation modifiée avec succès sur le serveur.');
        
      } catch (error) {
        console.error('Erreur lors de la modification de la formation  sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la modification de la formation sur le serveur.');
      }
  };

     // Edit Competence in data base 
    const handleEditCompetence = async (index: number) => {
      const competenceToEdit = profileCompetences[index];
      console.log(index);
      setCompetenceData({ ...competenceToEdit });
      setIsEditing(true);
      const updatedAddedCompetences = addedCompetences.map((comp, i) =>
      i === index ? { ...comp, ...competenceData } : comp
    );
    setProfileCompetences(updatedAddedCompetences);
    

    try {
      await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        competences: updatedAddedCompetences,
      });
      console.log('Competence modifiée avec succès sur le serveur.');
    } catch (error) {
      console.error('Erreur lors de la modification de la Competence sur le serveur:', error);
      alert('Une erreur s\'est produite lors de la modification de la Competence sur le serveur.');
    }
  };
    
         // Edit Point fort in data base 
        const handleEditPointFort= async (index: number) => {
          const pointFortToEdit = profilePointFort[index];
          console.log(index);
          setPointFortData({ ...pointFortToEdit });
          setIsEditing2(true);
          const updatedAddedPointsForts = addedPointFort.map((point, i) =>
          i === index ? { ...point, ...pointFortData} : point
        );
        setProfilePointFort(updatedAddedPointsForts);
    
        try {
          await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
            point_fort: updatedAddedPointsForts,
          });
      
          console.log('Point Fort modifiée avec succès sur le serveur.');
        } catch (error) {
          console.error('Erreur lors de la modification de la point fort sur le serveur:', error);
          alert('Une erreur s\'est produite lors de la modification de la point fort sur le serveur.');
        }
      };
      
      // Edit langue in data base 
      const handleEditLangue = async (index: number) => {
        const langueToEdit = profileLangues[index];
        console.log(index);
        setLangueData({ ...langueToEdit });
        setIsEditing1(true);
        const updatedAddedLangues = addedLangues.map((langue, i) =>
        i === index ? { ...langue, ...langueData } : langue
      );
      setProfileLangue(updatedAddedLangues);
      
  
      try {
        await axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
          langues: updatedAddedLangues,
        });
    
        console.log('Langue modifiée avec succès sur le serveur.');
      } catch (error) {
        console.error('Erreur lors de la modification de la langue sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la modification de la langue sur le serveur.');
      }
    };

    const handleUpdateExperience = async (index: number) => {
      try {
        setProfileData((prevData) => {
          if (!prevData) {
            return prevData; // Return early if prevData is null
          }
    
          const updatedAddedExperiences = prevData.experiences.map((exp, i) =>
            i === index ? { ...exp, ...experienceData } : exp
          );
    
          setIsEditing3(false);
          setProfileExperiences(updatedAddedExperiences);
          axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
            experiences: updatedAddedExperiences,
          }).catch((error) => {
            console.error('Erreur lors de la modification de l\'expérience sur le serveur:', error);
            alert('Une erreur s\'est produite lors de la modification de l\'expérience sur le serveur.');
          });
          setExperienceData(initialExperienceData);
 
          return {
            ...prevData,
            experiences: updatedAddedExperiences,
          };
  
        });
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
      }
    };
    
    


// Update Formation in data base 
const handleUpdateFormation = async (index : number) => {
  try {
    setProfileData((prevData) => {
      if (!prevData) {
        return prevData; // Return early if prevData is null
      }

      const updatedAddedFormations = prevData.formations.map((form, i) =>
        i === index ? { ...form, ...formationData } : form
      );

      setIsEditing4(false);
      setProfileFormations(updatedAddedFormations);
      axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        formations: updatedAddedFormations,
      }).catch((error) => {
        console.error('Erreur lors de la modification de la formation sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la modification de la formation sur le serveur.');
      });
      // router.reload(); 
      setFormationData(initialFormationData);
      return {
        ...prevData,
        formations: updatedAddedFormations,
      };
      
    });
  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
  }
};


// Update Competence in data base 
const handleUpdateCompetence = async (index : number) => {
  try {
    setProfileData((prevData) => {
      if (!prevData) {
        return prevData; // Return early if prevData is null
      }

      const updatedAddedCompetences = prevData.competences.map((comp, i) =>
        i === index ? { ...comp, ...competenceData } : comp
      );

      setIsEditing(false);
      setProfileCompetences(updatedAddedCompetences);
      axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        competences: updatedAddedCompetences,
      }).catch((error) => {
        console.error('Erreur lors de la modification de la compétence sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la modification de la compétence sur le serveur.');
      });
      setCompetenceData(initialCompetenceData); 
      return {
        ...prevData,
        competences: updatedAddedCompetences,
      };
     
      
    });
  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
  }
};
  
// Update Competence in data base 
const handleUpdatePointFort = async (index : number) => {

  try {
    setProfileData((prevData) => {
      if (!prevData) {
        return prevData; // Return early if prevData is null
      }
      const updatedAddedPointsForts = prevData.point_fort.map((point, i) =>
        i === index ? { ...point, ...pointFortData } : point
      );

      setIsEditing2(false);
      setProfilePointFort(updatedAddedPointsForts);
      axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        point_fort: updatedAddedPointsForts,
      }).catch((error) => {
        console.error('Erreur lors de la modification de la point fort sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la point fort de l\'expérience sur le serveur.');
      });
      setPointFortData(initialPointFortData);
      return {
        ...prevData,
        point_fort: updatedAddedPointsForts,
      };
      
    });
  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
  }
};
  
// Update Langue in data base 
const handleUpdateLangue = async (index : number) => {
  try {
    setProfileData((prevData) => {
      if (!prevData) {
        return prevData; 
      }

      const updatedAddedLangues = prevData.langues.map((langue, i) =>
        i === index ? { ...langue, ...langueData } : langue
      );

      setIsEditing1(false);
      setProfileLangue(updatedAddedLangues);
      axios.patch(`http://localhost:3001/profiles/${router.query.id}`, {
        langues: updatedAddedLangues,
      }).catch((error) => {
        console.error('Erreur lors de la modification de la langue sur le serveur:', error);
        alert('Une erreur s\'est produite lors de la modification de la langue sur le serveur.');
      });
      setLangueData(initialLangueData);
      return {
        ...prevData,
        langues: updatedAddedLangues,
      };
      
    });
  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
  }
};
  

  return (
    <Grid container spacing={3}>

       
      <Grid item xs={12} lg={4}>
     
      <BaseCard >
     
      
        <Box textAlign={"center"}>
          <br />
          <br />
          <Avatar
            src={"/assets/images/" + profileData?.img}
            sx={{ width: 100, height: 100, m: "0 auto" }}
          />
          <Typography variant="h5" mt={4}>
            {name}
          </Typography>
          <Stack spacing={3}>
          <label style={{ textAlign: 'left' }} >Nom & Prénom :</label>
            <input
              type="text"
              defaultValue={profileData?.name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <br />
            <label style={{ textAlign: 'left' }} >Poste :</label>
            <input
              type="text"
              defaultValue={profileData?.job}
              onChange={(e) => setJob(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <br />
            <label style={{ textAlign: 'left' }} >E-mail:</label>
            <input
              type="text"
              defaultValue={profileData?.email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            
            <div>
    <label style={{textAlign:'left'}} >Remplir tes compétences</label>
      <br />
      <input
        type="text"
        value={competenceData.name}
        onChange={(e) =>
          setCompetenceData({
            ...competenceData,
            name: e.target.value,
          })
        }
          
        style={{
          width: 'calc(5ch * 5)', 
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '10px',
        }}
      />
      <Button onClick={handleSaveCompetence}>Ajouter</Button>
      
      {profileData && profileData.competences && profileData.competences.length > 0 && (
  <Box display="flex" alignItems="center">
    <Typography variant="body1" mt={3} style={{ flex: 1 }}>
      <h1>COMPÉTENCES </h1>
      <br />
      <div>
        {profileData.competences.map((item, ind) => {
          return (
            <div key={ind} style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
            <Chip
              sx={{
                pl: '4px',
                pr: '4px',
                backgroundColor: 'lightblue',
                color: '#fff',
              }}
              size="small"
              label={item.name}
            />
            <Button onClick={() => handleEditCompetence(ind)}>
              <Edit />
            </Button>
            <Button onClick={() => handleDeleteCompetence(ind)}>
              <Delete />
            </Button>
            {isEditing ? (
              <Box>
                <Button onClick={() => handleUpdateCompetence(ind)}>
                  Mettre à jour
                </Button>
              </Box>
            ) : null}
          </div>
          
          );
        })}
      </div>
    </Typography>
  </Box>
)}


    
    </div>
    <div>
            <label style={{textAlign:'left'}} >Remplir tes langues :</label>
              <br />
              <input
        type="text"
        value={langueData.name}
        onChange={(e) =>
          setLangueData({
            ...langueData,
            name: e.target.value,
          })
        }
          
        style={{
          width: 'calc(5ch * 5)', 
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '10px',
        }}
      />
              <Button onClick={handleSaveLangue} >Ajouter</Button>
              
{profileData && profileData.langues && profileData.langues.length > 0 && (
  <Box display="flex" alignItems="center">
    <Typography variant="body1" mt={3} style={{ flex: 1 }}>
      <h1>LANGUES</h1>
      <br />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {profileData.langues.map((langue, ind) => {
          return (
            <li key={ind}>{langue.name}
            <Button onClick={() => handleEditLangue(ind)}>
              <Edit />
            </Button>
            <Button onClick={() => handleDeleteLangue(ind)}>
              <Delete />
            </Button>
            {isEditing1 ? (
                <Box>
                  <Button onClick={() => handleUpdateLangue(ind)}>
                    Mettre à jour
                  </Button>
                </Box>
              ) : null}
            </li>
            
          );
        })}
      </ul>
    </Typography>
  </Box>
)}

          </div>
          </Stack>
        </Box>
        </BaseCard></Grid>
     

      
      <Grid item xs={11} lg={8}>

      <BaseCard title={job}>
          <>
          <Grid>
            <Grid item xs={12} lg={12}>
            <h1 className="text-center text-black font-sans italic font-bold text-2xl mr-80">
                  Modification d`un Profil
          </h1>
            </Grid>
            <Grid item xs={12} lg={4}>
            <Image src="/assets/images/logo_sifast.png" alt="Logo Sifast" width={150} height={100} style={{ marginLeft: '500px',marginTop:'auto' }} />

            </Grid>
          </Grid>

         


          <div>
            <label style={{textAlign:'left'}} >Remplir tes Points forts :</label>
              <br />
                  <input
                    type="text"
                    value={pointFortData.name}
                    onChange={(e) =>
                      setPointFortData({
                        ...pointFortData,
                        name: e.target.value,
                      })
                    }            
                    style={{
                      width: 'calc(5ch * 5.5)',  
                      padding: '8px',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '10px',
                    }}
                  />
              <Button onClick={handleSavePointFort} >Ajouter</Button>
{profileData && profileData.point_fort && profileData.point_fort.length > 0 && (
  <Box display="flex" alignItems="center">
    <Typography variant="body1" mt={3} style={{ flex: 1 }}>
      <h1>Points forts</h1>
      <br />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {profileData.point_fort.map((point, ind) => {
          return (
            <li key={ind}>{point.name} <br />
            <Button onClick={() => handleEditPointFort(ind)}>
                  <Edit />
                </Button>
                <Button onClick={() => handleDeletePointFort(ind)}>
                  <Delete />
                </Button>
                {isEditing2 ? (
                  <Box>
                    <Button onClick={() => handleUpdatePointFort(ind)}>
                      Mettre à jour
                    </Button>
                  </Box>
                ) : null}

            </li>
          );
        })}
      </ul>
    </Typography>
  </Box>
)}


          </div>
          <br />
          <h1>Remplir tes expériences professionnelles </h1> 
        
            <Stack spacing={3} direction={'row'}>
              <TextField
                id="date-basic"
                label=""
                type="date"
                variant="outlined"
                style={{ width: 'calc(5ch * 3.3)' }}
                value={experienceData.startDate}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    startDate: e.target.value,
                  })
                }
              />
              <TextField
                id="date-basic"
                label=""
                type="date"
                variant="outlined"
                style={{ width: 'calc(5ch * 3.3)' }}
                disabled={isCheckboxChecked}
                value={experienceData.endDate}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    endDate: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={isCheckboxChecked}
                    onChange={(e) => {
                      setCheckboxChecked(!isCheckboxChecked);
                      setExperienceData({
                        ...experienceData,
                        endDate: e.target.checked ? 'Jusqu à aujourdhui' : e.target.value,
                      });
                    }}
                  />
                }
                label="Jusqu'à aujourd'hui"
              />

            </Stack>
            <br />
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Mission"
                variant="outlined"
                style={{ width: 'calc(5ch * 11.6)' }}
                value={experienceData.mission}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    mission: e.target.value,
                  })
                }
              />
              <TextField
                id="name-basic"
                label="Nom de l'entreprise ou organisation"
                variant="outlined"
                style={{ width: 'calc(5ch * 11.6)' }}
                value={experienceData.companyName}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    companyName: e.target.value,
                  })
                }
              />
              
              <TextField
                id="name-basic"
                label="Projet"
                variant="outlined"
                style={{ width: 'calc(5ch * 11.6)' }}
                value={experienceData.projet}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    projet: e.target.value,
                  })
                }
              />
              <br />
            </Stack>
            <Stack spacing={3} direction={'row'}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={3}
                style={{ width: 'calc(5ch * 15)' }}
                value={experienceData.description}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    description: e.target.value,
                  })
                }
              />
            </Stack> <br />
            <Stack spacing={3} direction={'row'}>
              <TextField
                id="outlined-multiline-static"
                label="Tâches "
                multiline
                rows={3}
                style={{ width: 'calc(5ch * 15)' }}
                value={experienceData.taches}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    taches: e.target.value,
                  })
                }
              />
            </Stack>
            <br />
            <TextField
                id="name-basic"
                label="Environnement"
                variant="outlined"
                style={{ width: 'calc(5ch * 11.6)' }}
                value={experienceData.environnement}  
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    environnement: e.target.value,
                  })
                }
              />
            <br />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Button onClick={handleSaveExperience}>
                  Enregistrer
                </Button>
              </Box>
        
            </Box>
            
            

            {/* Affiche les expériences depuis profileData si profileData.experiences existe */}
            {profileData && profileData.experiences && profileData.experiences.length > 0 && (
              <Box display="flex" alignItems="center">
                <Typography variant="body1" mt={3} style={{ flex: 1 }}>
                <h1>EXPÉRIENCES PROFESSIONNELLES </h1> 
                <br />
                  {profileData.experiences.map((exp, ind) => {
                    {/* indexToModify++; */ }
                    return (
                      <div key={ind}>
                      <span className='font-bold underline'>{`${exp.mission} | ${ exp.companyName}`}</span>
                      <br />
                      {` De ${exp.startDate} - ${exp.endDate}`} <br />
                      <span className='text-gray-500 bold'>{` Projet ${exp.projet}`} </span> <br />
                      <span className='underline'>Description </span> <br />
                      {`${exp.description}`} <br />
                      <span className='underline'>Tâches </span> <br />
                      {`${exp.taches}`} <br />
                      <span className='underline'>Environnement </span> <br />
                      {`${exp.environnement}`}
                      <Button onClick={() => {
                      handleEditExperience(ind);
                    }}>
                      <Edit />
                    </Button>
                    <Button onClick={() => handleDeleteExperience(ind)}>
                      <Delete />
                    </Button>
                    {isEditing3 ? (
                      <Box>
                        <Button onClick={() => handleUpdateExperience(ind)}>
                          Mettre à jour
                        </Button>
                      </Box>
                    ) : null}
                      </div>
                      
                    );          
                  })}
                  
                </Typography>
              </Box>
            )}


          <br />
          <hr />
        <br />
        <h1>Remplir tes formations </h1>
        <Stack direction={'row'} spacing={3}>
            <TextField
                id="date-basic"
                label=""
                type="date"
                value={formationData.startDate}
                variant="outlined"
                onChange={(e) =>
                  setFormationData({
                    ...formationData,
                    startDate: e.target.value,
                  })
                }
                style={{ width: 'calc(5ch * 3.3)' }} 
              />
              <TextField
            id="date-basic"
            label=""
            type="date"
            variant="outlined"
            value={formationData.endDate}
            style={{ width: 'calc(5ch * 3.3)' }}
            onChange={(e) =>
              setFormationData({
                ...formationData,
                endDate: e.target.value,
              })
            }
            disabled={isCheckboxChecked1}
            />
            <FormControlLabel
            control={
            <Checkbox
            defaultChecked={isCheckboxChecked1}
            onChange={(e) => {
              setCheckboxChecked1(!isCheckboxChecked1);
              setFormationData({
                ...formationData,
                endDate: e.target.checked ? 'Jusqu à aujourdhui' : e.target.value,
              });
            }}
            />
            }
            label="Jusqu'à aujourd'hui"
            />
        </Stack>
          <br />

        <Stack spacing={3} >
          <TextField
            id="name-basic"
            label="Nom du diplôme "
            value={formationData.diplome}
            variant="outlined" 
            style={{ width: 'calc(5ch * 11.6)' }}
            onChange={(e) =>
              setFormationData({
                ...formationData,
                diplome: e.target.value,
              })
            }
          />
          <TextField
            id="name-basic"
            label="Nom de l'école    "
            variant="outlined"
            value={formationData.companyName}
            onChange={(e) =>
              setFormationData({
                ...formationData,
                companyName: e.target.value,
              })
            }
            style={{ width: 'calc(5ch * 11.6)' }} 
          />
          
          <br />
        </Stack>
          <br />
        

        <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Button onClick={handleSaveFormation}>
                  Enregistrer
                </Button>
              </Box>
             
            </Box>

            {/* Affiche les formations depuis profileData si profileData.experiences existe */}
            {profileData && profileData.formations && profileData.formations.length > 0 && (
              <Box display="flex" alignItems="center">
                <Typography variant="body1" mt={3} style={{ flex: 1 }}>
                <h1>DIPLÔMES ET FORMATIONS </h1> 
                <br />
                  {profileData.formations.map((formation, ind) => {
                    return (
                      <div key={ind}>
                        <span className='font-bold'>{`${formation.diplome} `}</span>
                        <br />
                        {`${formation.companyName} De ${formation.startDate} - ${formation.endDate}`} <br />

                        <Button onClick={() => {handleEditFormation(ind);}}>
                            <Edit />
                          </Button>
                          <Button onClick={() => handleDeleteFormation(ind)}>
                            <Delete />
                          </Button>

                          {isEditing4? (
                            <Box>
                              <Button onClick={() => handleUpdateFormation(ind)}>
                                Mettre à jour
                              </Button>
                            </Box>
                          ) : null}
                      </div>
                    );          
                  })}
                </Typography>
              </Box>
            )}


          </>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Forms;