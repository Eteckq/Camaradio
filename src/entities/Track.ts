export class Track{
    id: string = ""
    name: string = ""
    uri: string = ""
    duration_ms: number = 0
    images: {height:number, width:number, url:string}[] = []
}

export default Track;
