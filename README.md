# Socket documentation

## Client:

### emit:

hello
{
    id: string = Id du client
}

addTrack
{
    trackId: string = Id de la musique
}

### on:

updateTrackList
{
    tracksId: string[] = Tableau des musiques de la queue
}