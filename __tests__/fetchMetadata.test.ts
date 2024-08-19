
import { fetchMetadata } from '@/actions/fetch-metadata';
import axios from 'axios';

// Mock axios using Jest
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Metadata interface (ensure it matches the original fetchMetadata function's return type)
interface Metadata {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    error?: string;
}

describe('fetchMetadata', () => {
    const validUrl = 'https://hoppscotch.io/';
    const validResponse: Metadata[] = [
        {
            url: validUrl,
            title: 'Hoppscotch • Open source API development ecosystem',
            description: 'Helps you create requests faster, saving precious time on development.',
            image: 'https://hoppscotch.io/banner.png',
        },
    ];

    it('should handle no URLs (undefined)', async () => {
        const urls: string[] = undefined as any;

        await expect(fetchMetadata(urls)).rejects.toThrow('Failed to fetch metadata');
        expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('should handle an empty array of URLs', async () => {
        const urls: string[] = [];

        mockedAxios.post.mockResolvedValueOnce({ data: [] as Metadata[] });

        const result = await fetchMetadata(urls);
        expect(result).toEqual([]);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://fetch-metadata.vercel.app/fetch-metadata', { urls });
    });

    it('should handle three valid URLs', async () => {
        const urls = [validUrl, validUrl, validUrl];

        mockedAxios.post.mockResolvedValueOnce({ data: [validResponse[0], validResponse[0], validResponse[0]] });

        const result = await fetchMetadata(urls);
        expect(result).toEqual([validResponse[0], validResponse[0], validResponse[0]]);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://fetch-metadata.vercel.app/fetch-metadata', { urls });
    });

    it('should handle four valid URLs', async () => {
        const urls = [validUrl, validUrl, validUrl, validUrl];

        mockedAxios.post.mockResolvedValueOnce({
            data: [validResponse[0], validResponse[0], validResponse[0], validResponse[0]],
        });

        const result = await fetchMetadata(urls);
        expect(result).toEqual([validResponse[0], validResponse[0], validResponse[0], validResponse[0]]);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://fetch-metadata.vercel.app/fetch-metadata', { urls });
    });

    it('should handle three valid URLs and one invalid URL', async () => {
        const invalidUrl = 'https://invalid-url.com/';
        const urls = [validUrl, validUrl, invalidUrl, validUrl];

        mockedAxios.post.mockResolvedValueOnce({
            data: [
                validResponse[0],
                validResponse[0],
                { url: invalidUrl, error: 'Failed to fetch metadata' },
                validResponse[0],
            ],
        });

        const result = await fetchMetadata(urls);
        expect(result).toEqual([
            validResponse[0],
            validResponse[0],
            { url: invalidUrl, error: 'Failed to fetch metadata' },
            validResponse[0],
        ]);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://fetch-metadata.vercel.app/fetch-metadata', { urls });
    });
});
