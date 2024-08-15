import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { apiConstant } from 'src/app/core/constants/api-constant';
import { HttpService } from 'src/app/core/service/api-service/http.service';
import { LocalStorageService } from 'src/app/core/service/localStorage/local-storage.service';
import { StarwarService } from 'src/app/services/starwar.service';
declare var $: any
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 20;
  movies: any = [];
  speciesList: any = [];
  vehicles: any = [];
  starships: any = [];

  selectedMovie:any=''
  selectedSpecies:any=''
  selectedVehicle:any=''
  selectedStarship:any=''
  speciesNames:any
  birthYearFilterEnabled: boolean = false;
  minBirthYear: number | null = null;
  maxBirthYear: number | null = null;
  filteredItems: any;
  constructor(private router:Router,private localstorage:LocalStorageService,private starWarsService: StarwarService,private httpService: HttpService) { }

  ngOnInit(): void {

  $('.loaderScreen').fadeIn()
  this.getStarWardata()
   
  }


  getStarWardata(){

    console.log(this.currentPage);
    
    const getMovies = this.httpService.get(apiConstant.getMovies);
    const getSpecies = this.httpService.get(apiConstant.getSpecies+'/?page='+this.currentPage);
    const getVehicles = this.httpService.get(apiConstant.getVehicles+'/?page='+this.currentPage);
    const getStarShips = this.httpService.get(apiConstant.getStarShips+'/?page='+this.currentPage);
    const getPeoples = this.httpService.get(apiConstant.getPeoples+'/?page='+this.currentPage);
    forkJoin([getPeoples,getMovies, getSpecies,getVehicles,getStarShips])
    .subscribe(([peopleRes,moviesRes, speciesRes,vehicleRes,starRes]:[any,any,any,any,any]) => {
      this.movies = moviesRes.results;
      this.speciesList = speciesRes.results;
      this.vehicles = vehicleRes.results;
      this.starships = starRes.results;
      this.characters=peopleRes.results
      this.filteredCharacters=this.characters
      this.filteredCharacters.forEach(character => {
        this.starWarsService.fetchMultipleResources(character.species).subscribe(species => {
          character.speciesNames = species.join(', ');
         
        });

        
  
      });

      $('.loaderScreen').fadeOut()
    });
  }

  // updateFilteredCharacters() {

  //   this.httpService.get(apiConstant.getPeoples+'/?page='+this.currentPage).subscribe((res:any)=>{
      
  //     this.filteredCharacters=res.results
  //     this.filteredCharacters.forEach(character => {
  //       this.starWarsService.fetchMultipleResources(character.species).subscribe(species => {
  //         character.speciesNames = species.join(', ');
  //       });
  //     });
  //     console.log(this.filteredCharacters);
  //     $('.loaderScreen').fadeOut()
  //   })
  // }


  previousPage(): void {
    this.selectedMovie = '';
    this.selectedSpecies = '';
    this.selectedVehicle = '';
    this.selectedStarship = '';
    if (this.currentPage > 1) {
      $('.loaderScreen').fadeIn()
      this.currentPage--;
      this.getStarWardata();
    }
  }

  nextPage(): void {
    this.selectedMovie = '';
    this.selectedSpecies = '';
    this.selectedVehicle = '';
    this.selectedStarship = '';
    if (this.currentPage < this.totalPages) {
      $('.loaderScreen').fadeIn()
      this.currentPage++;
      this.getStarWardata();
    }
  }
  

  applyFilters(): void {
    // this.getStarWardata()
    // this.Search()
  }

//   Search(): void {

// let filtered = [...this.filteredCharacters];
// console.log(filtered);

// if (this.selectedMovie) {

// let filteredItems = this.movies.map((movie: any) => {
//   let filteredCharacters = filtered.filter((character: any) => {
//     return character.films.some((filmUrl: any) => filmUrl === movie.url);
//   });
//   return {
//     movie: movie,
//     characters: filteredCharacters
//   };
// });

//   filteredItems= filteredItems.filter((i:any)=>{
//     if(i.movie.url==this.selectedMovie){
//       return i.characters
//     }
//   })
//   if(filteredItems[0].characters.length>0){
//     filtered=filteredItems[0].characters
//     console.log(filteredItems[0].characters);
//   }
// }


// if (this.selectedSpecies) {
//   let filteredItems = this.speciesList.map((species: any) => {
//     let filteredCharacters = filtered.filter((character: any) => {
//       return character.species.some((speciesURL: any) => speciesURL === species.url);
//     });
//     return {
//       Species: species,
//       characters: filteredCharacters
//     };
//   });
//   filteredItems = filteredItems.filter((item: any) => {
//     return item.Species.url === this.selectedSpecies;
//   });
//     filteredItems= filteredItems.filter((i:any)=>{
//       if(i.Species.url==this.selectedSpecies){
//         return i.characters
//       }
//     })

//     if(filteredItems[0].characters.length>0){
//       filtered=filteredItems[0].characters
//       console.log(filteredItems[0].characters);
//     }
    
// }


// if (this.selectedVehicle) {
//   let filteredItems = this.vehicles.map((vechicle: any) => {
//     let filteredCharacters = filtered.filter((character: any) => {
//       return character.vehicles.some((vehicleURL: any) => vehicleURL === vechicle.url);
//     });
//     return {
//       vehicle: vechicle,
//       characters: filteredCharacters
//     };
//   });
  
//     filteredItems= filteredItems.filter((i:any)=>{
//       if(i.vehicle.url==this.selectedVehicle){
//         return i.characters
//       }
//     })
//     if(filteredItems[0].characters.length>0){
//       filtered=filteredItems[0].characters
//       console.log(filteredItems[0].characters);
//     }
// }

// if (this.selectedStarship) {
//   let filteredItems = this.starships.map((star: any) => {
//     let filteredCharacters = filtered.filter((character: any) => {
//       return character.starships.some((starURL: any) => starURL === star.url);
//     });
//     return {
//       starShip: star,
//       characters: filteredCharacters
//     };
//   });
  
//     filteredItems= filteredItems.filter((i:any)=>{

//       console.log(i);
      
//       if(i.starShip.url==this.selectedStarship){
//         return i.characters
//       }
//     })
//     if(filteredItems[0].characters.length>0){
//       filtered=filteredItems[0].characters
//       console.log(filteredItems[0].characters);
//     }
// }


//     this.filteredCharacters = filtered;
//     this.selectedMovie = '';
//     this.selectedSpecies = '';
//     this.selectedVehicle = '';
//     this.selectedStarship = '';
//   }
Search(): void {
  // this.getStarWardata()
this.filteredCharacters=  this.characters

console.log(this.characters);

  let filtered = [...this.filteredCharacters];

  if (this.selectedMovie) {
    const movie = this.movies.find((movie: any) => movie.url === this.selectedMovie);
    if (movie) {
      filtered = filtered.filter((character: any) => 
        character.films.includes(movie.url)
      );
    }
  }

  if (this.selectedSpecies) {
    const species = this.speciesList.find((species: any) => species.url === this.selectedSpecies);
    if (species) {
      filtered = filtered.filter((character: any) => 
        character.species.includes(species.url)
      );
    }
  }

  if (this.selectedVehicle) {
    const vehicle = this.vehicles.find((vehicle: any) => vehicle.url === this.selectedVehicle);
    if (vehicle) {
      filtered = filtered.filter((character: any) => 
        character.vehicles.includes(vehicle.url)
      );
    }
  }

  if (this.selectedStarship) {
    const starship = this.starships.find((starship: any) => starship.url === this.selectedStarship);
    if (starship) {
      filtered = filtered.filter((character: any) => 
        character.starships.includes(starship.url)
      );
    }
  }

  this.filteredCharacters = filtered;
  console.log(this.filteredCharacters);
}
  characterdetail(value: any): void {
    console.log(value);

   let  Uniqnnumber = this.extractLastNumberFromUrl(value.url);
    const films = this.starWarsService.fetchMultipleResourcesURL(value.films);
    const starships = this.starWarsService.fetchMultipleResourcesURL(value.starships);
    const vehicles = this.starWarsService.fetchMultipleResourcesURL(value.vehicles);

    forkJoin([films, starships, vehicles]).subscribe(
      ([films, starships, vehicles]) => {
        value.filmnames = films.map(film => film.title);
        value.starshipnames = starships.map(starship => starship.name);
        value.vehiclenames = vehicles.map(vehicle => vehicle.name);
        this.localstorage.setKey('detail',value)
        this.router.navigate(['characters',Uniqnnumber]);
      },
     
    );
   
    
  }
  extractLastNumberFromUrl(url: any) {
    const a = url.split('/');
    const b = a.filter((segment:any) => segment.length > 0).pop();
    return b;
  }
}