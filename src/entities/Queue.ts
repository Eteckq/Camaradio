import Track from '@entities/Track';

export default class Queue {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  addTrack(trackId: string, userId: string) {
    return new Promise((resolve, reject) => {
      if(this.trackExist(trackId)){
        reject('This track is already in queue')
      } else {
        const track: Track = new Track(trackId, userId)
        this.tracks.push(track);
        resolve(track)
      }
    })
  }

  getTracks() {
    return this.tracks;
  }

  private trackExist(trackId: string): boolean{
    return this.tracks.some(track => track.trackId === trackId)

  }
}
