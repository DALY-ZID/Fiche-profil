import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';

import ElementProfile from './Profile';
export default function ListProfil(){

    const[profiles,setProfiles]=useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3001/profiles")
        .then((response)=>setProfiles(response.data));
    }, []);

    const deleteProfile = async (id) => {
        if (!window.confirm("Are you sure you want to delete")) {
            return;
        }
    
    await axios.delete('http://localhost:3001/profiles/' + id)
        .then(() => {
            console.log('successfully deleted!')
            setProfiles(prevProfiles => prevProfiles.filter((profile) => profile.id !== id));
        }).catch((error) => {
            console.log(error)
            })
    }

    // const SearchProd = async (reference) => {
    //     axios.delete('http://localhost:3001/produits')
    //       .then(() => {
    //         setArticles(prevArticles => prevArticles.filter((article) => article.reference === reference));
    //   })
    // }
    return(
        <>
            <ElementProfile profiles = {profiles} deleteProfile = {deleteProfile} />
        </>
    )
}