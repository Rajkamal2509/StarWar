import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/core/service/localStorage/local-storage.service';
import { StarwarService } from 'src/app/services/starwar.service';
declare var $: any
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {
  character: any; 
  homeworldName: any;
  speciesNames: any;
  filmNames: any=[];
  vehicleNames: any=[];
  starshipNames: any=[];

  constructor(private localstorage:LocalStorageService,private starWarsService: StarwarService) {}

  ngOnInit(): void {
    $('.loaderScreen').fadeIn()

   this.getDetail()

}

getDetail(){
  this.character= this.localstorage.getKey('detail')

  this.starWarsService.fetchResource(this.character.homeworld).subscribe((homeworld) => {
    this.character.homeworldName=homeworld.name
    $('.loaderScreen').fadeOut()
  });
  console.log(this.character);

}
}
