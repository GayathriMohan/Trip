import {Component} from '@angular/core';
import '../../public/css/styles.css';
import Events = NodeJS.Events;
import {isUndefined} from "util";

export class Trip{
    sourceLocation : string;
    destinationLocation : string;
    stops : number;
}
export class TripDetails{
    sourceLocation : string;
    destinationLocation : string;
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
     title = "Welcome to Trip Planner";
     public trips : Trip[]=[];
     trip : Trip={
         sourceLocation : "",
         destinationLocation : "",
         stops : 0
};
    public tripDetails : TripDetails[]=[];



    //Add a trip with source location, destination location and number of stops
     addTrip(){
         this.tripDetails=[];
         let tempTrip : Trip={
             sourceLocation : this.trip.sourceLocation,
             destinationLocation :this.trip.destinationLocation,
             stops :this.trip.stops
         };
         for(var i=0;i<tempTrip.stops;i++){
             let tripDetail : TripDetails={
                 sourceLocation: "",
                 destinationLocation : ""
             };
             if(i==0){
                 tripDetail.sourceLocation=tempTrip.sourceLocation;
             }
             if(i==tempTrip.stops-1){
                 tripDetail.destinationLocation=tempTrip.destinationLocation;
             }
             this.tripDetails.push(tripDetail);
         }
         this.trips.push(tempTrip);
     }

    //adds a stop
     addRow(index : number){
         let counter = this.tripDetails.length;
         const rowCounter = index;


         for(counter;counter>rowCounter+1;counter--){
             var data1=this.tripDetails[counter-1].sourceLocation;
             var data2=this.tripDetails[counter-1].destinationLocation;
             this.tripDetails[counter]={
                 sourceLocation : data1,
                 destinationLocation : data2
             };

         }
         this.tripDetails[rowCounter+1].destinationLocation="";
         this.tripDetails[rowCounter+2].sourceLocation="";
     }

     //removes a stop
    removeRow(index : number){
         this.tripDetails.splice(index,1);
         this.tripDetails[index].sourceLocation=this.tripDetails[index-1].destinationLocation;

    }

    //Keeps Data in sync
     takeData(i : number,fromwhere : string){
       /* console.log(JSON.stringify(this.tripDetails[i]));*/

        if(fromwhere=="dest")
             this.tripDetails[i + 1].sourceLocation = this.tripDetails[i].destinationLocation;

        else {
             this.tripDetails[i - 1].destinationLocation = this.tripDetails[i].sourceLocation;
         }

     }

     //this binds the from and to locations to the list - table
     bindData(){
         if(isUndefined(this.tripDetails[0]))
         {
             let tempTripDetail : TripDetails={
                 sourceLocation: this.trip.sourceLocation,
                 destinationLocation : this.trip.destinationLocation
             };
             this.tripDetails.push(tempTripDetail);
         }

         else {
             this.tripDetails[0] = {
                 sourceLocation: this.trip.sourceLocation,
                 destinationLocation: this.tripDetails[0].destinationLocation
             };
             this.tripDetails[this.tripDetails.length - 1] = {
                 sourceLocation: this.tripDetails[this.tripDetails.length - 1].sourceLocation,
                 destinationLocation: this.trip.destinationLocation
             }
         }
     }
}
