import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box,Grid } from '@mui/material';
import { useRef } from 'react';
import  html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import LinkedInIcon from '@mui/icons-material/LinkedIn';




interface ProfileData {
  name: string;
  email: string;
  job: string;
  img: string;
  experiences: ExperienceData[];
  point_fort: PointFortData[];
  formations: FormationData[];
  langues: LangueData[];
}

interface ExperienceData {
  startDate: string;
  endDate: string;
  mission: string;
  companyName: string;
  details: string;
  tache: string;
  projet: string;
  environnement: string;
  color: string;
}
interface FormationData {
  startDate: string;
  endDate: string;
  diplome: string;
  companyName: string;
}

interface PointFortData {
  name: string;
}
interface LangueData {
  name: string;
}

interface CompetenceData {
  name: string;
}

export default function Fiche() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [experiences, setExperiences] = useState<ExperienceData[] | null>(null);
  const [pointforts, setPointforts] = useState<PointFortData[] | null>(null);
  const [competence, setCompetence] = useState<CompetenceData[] | null>(null);
  const [formation, setFormation] = useState<FormationData[] | null>(null);
  const [langue, setLangue] = useState<LangueData[] | null>(null);

  const handlePrintToPDF = () => {
    if (pdfRef.current) {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 15;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Fiche profil de ${profile?.name}.pdf`);
      });
    }
  };

  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${router.query.id}`);
        setProfile(response.data);
        setExperiences(response.data.experiences);
        setPointforts(response.data.point_fort);
        setCompetence(response.data.competences);
        setFormation(response.data.formations);
        setLangue(response.data.langues);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données.', error);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <div ref={pdfRef} >
   

      


      {profile && (<>
        
      
      
      <Grid container spacing={3}>
<Grid item xs={12} lg={4}>
<div style={{ width: '170px', height: '170px', borderRadius: '50%', overflow: 'hidden' }}>
        <Image
                        src={"/assets/images/" + profile.img}
                        alt="Profile Image"
          width={150}
          height={150}
          layout="responsive"
        />
      </div>
      <br />
      <span className='font-bold' style={{ color: '#3498db', fontSize: '1.8em' }}>{profile.name}</span>
      <h1 style={{ paddingLeft:"10px", fontSize: '1.0em' }}>Email : {profile.email}</h1>
  
</Grid>
<Grid item xs={12} lg={5} style={{marginTop:"30px", marginLeft:"auto"}}>
<span className='font-bold' style={{ fontSize: '2.8em'}}>{profile.job}</span>

</Grid>
<Grid item xs={12} lg={3} >

<Box style={{ float: 'right', marginRight: '10px' }}>
   <Image src="/assets/images/logo_sifast.png" alt="Logo Sifast" width={150} height={100} style={{ marginLeft: 'auto', marginRight: '10px' }} />
   <br />
   
      <h1 style={{  marginRight: '5px' }} ><EmailIcon /> : contact@sifast.c </h1>
      <h1 style={{  marginRight: '5px' }} ><PublicIcon/>: www.sifast.c </h1>
      <h1 style={{  marginRight: '5px' }} > <LinkedInIcon/> : /company/sifast- </h1>
</Box>
</Grid>
</Grid>
        <Box sx={{ width: '66.666%', margin: '0 auto', color: '#333' }}>
          
          
          <br />
          <br />
          <h1 style={{ color: 'black', fontSize: '1.7em' }}>Points Forts :</h1>
          <br />
          <ul style={{ fontSize: '1.1em', listStyleType: 'circle', marginLeft: '20px' ,paddingLeft :"15px"}}>
            {pointforts && pointforts.map((point, ind) => (
              <li key={ind}>{point.name}</li>
              
            ))}
          </ul>
          <br />
          <h1 style={{ color: 'black', fontSize: '1.7em' }}>Compétences :</h1>
          <br />
          <ul style={{ fontSize: '1.1em', listStyleType: 'circle', marginLeft: '20px' ,paddingLeft :"15px"}}>
            {competence && competence.map((comp, i) => (
              <li key={i}>{comp.name}</li>
            ))}
          </ul>
          <br />

          <Timeline
            sx={{
              p: 0,
            }}
          >
            <h2 style={{ color: 'black', fontSize: '1.7em' }}>Expériences professionnelles :</h2>
            <br />
            {experiences && experiences.map((experience, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    fontSize: '1em',
                    fontWeight: '700',
                    flex: '0.18',
                    color: '#3498db',
                  }}
                >
                  {experience.startDate} -- {experience.endDate}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    variant="outlined"
                    sx={{
                      borderColor: experience.color,
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  color="text.secondary"
                  sx={{
                    fontSize: '1.1em',
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#e67e22', fontSize: '1.2em' }}>
                    {experience.mission} | {experience.companyName}
                  </div>
                  <Box>
                    <div  style={{ fontWeight: 'bold', color: 'gray', fontSize: '1.1em' }} > * Projet {experience.projet} </div>
                    
                    <div  style={{ fontWeight: 'bold', color: 'gray', fontSize: '1em',paddingLeft:"20px" }} > * Description </div>
                    <div style={{ paddingLeft:"50px" ,fontSize: '0.9em'}}>- {experience.details}</div>
                    <br />
                    <div  style={{ fontWeight: 'bold', color: 'gray', fontSize: '1em',paddingLeft:"20px" }} > * Tâches  </div>
                    <div style={{ paddingLeft:"50px" ,fontSize: '0.9em'}}>- {experience.tache}</div>
                    <br />
                    <div  style={{ fontWeight: 'bold', color: 'gray', fontSize: '1em',paddingLeft:"20px" }} > * Environnement  </div>
                    <div style={{ paddingLeft:"50px" ,fontSize: '0.9em'}}>- {experience.environnement}</div>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <br />
          <br />
          <h2 style={{ color: 'black', fontSize: '1.7em' }}>Formation et Perfectionnement :</h2>
<br />
          
  {formation &&
    formation.map((form, j) => (
      <>
      <Box key={j} style={{ display: 'flex', alignItems: 'center' , marginLeft: '93px' }}>
          <span style={{ fontWeight:"bold", marginRight: '10px' ,color:"orange" }}>{form.endDate}</span>
          <div style={{ width: '5px', height: '50px', backgroundColor: '#3498db' }}></div>
          <span > <div style={{  marginLeft: '10px' , fontWeight: 'bold', color: 'gray', fontSize: '1.1em' }}>{form.diplome}</div>
             <h1 style={{  marginLeft: '10px'}}>{form.companyName}</h1></span>
          

        </Box>
        <br />
        <br />
      </>
     
        
        
     
    ))}
    <br />
          <h1 style={{ color: 'black', fontSize: '1.7em' }}>Langues :</h1>
          <br />
          <ul style={{ fontSize: '1.1em', listStyleType: 'circle', marginLeft: '20px' ,paddingLeft :"15px"}}>
            {langue && langue.map((lang, i) => (
              <li key={i}>{lang.name}</li>
            ))}
          </ul>
        </Box>
        <br />
        <br />
        
        </>
      )}
     <div className="relative">
 
  <button onClick={handlePrintToPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-0">
    Imprimer en PDF <DownloadIcon/>
  </button>
</div>


    </div>
  );
}
