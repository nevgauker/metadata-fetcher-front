"use server"
import axios from 'axios';

export interface Metadata {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    error?: string;
}


export async function fetchMetadata(urls: string[]): Promise<Metadata[]> {
    console.log(urls)
    try {
        const response = await axios.post<Metadata[]>('https://fetch-metadata.vercel.app/fetch-metadata', {
            urls,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        throw new Error('Failed to fetch metadata');
    }

    return []
}
