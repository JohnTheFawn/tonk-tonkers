'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function FFLogsPage(
    {params}:
    {
      params: {
        world: string;
      };
    }) {
    const router = useRouter();

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData: {
            [key: string]: any;
        } = new FormData(event.currentTarget);
        const characterInputValue = formData.get('characterInput');
        if(characterInputValue){
            router.push(`/fflogs/${params.world}/${formData.get('characterInput')}/rdps/54`);
        }
    }

    return (
        <form className={`card textAlignCenter`} name="characterForm" onSubmit={onSubmit}>
            <h1><label htmlFor="characterInput">Character Name</label></h1>
            <input name="characterInput" type="text" className={`marginTop ${styles.characterInput}`}/>
            <button className={`button marginTop`}>Submit</button>
        </form>
    );
}