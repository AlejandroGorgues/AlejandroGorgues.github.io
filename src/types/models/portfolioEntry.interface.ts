import { type Image } from "./image.interface";

export interface Post {
    title: string;
    pubDate: Date;
    modDate: Date;
    description?: string;
    image: Image;
    tags: string[];
}

export interface Project {
    title: string;
    pubDate: Date;
    description?: string;
    image?: Image;
    tags?: string[];
    source: string;
    demo: string;
}

export interface Link {
    title: string;
    tags: string[];
    url: string;
}

export interface About {
    title: string;
    entity: string;
    startDate: Date;
    endDate: Date | string;
    techs: string[];
}

export interface Misc {
    title: string;
    entity: string;
    pubDate: Date;
}