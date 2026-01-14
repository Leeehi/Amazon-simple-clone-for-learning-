class Car {
  #brand;
  #model;
  speed = 0;
  trunk = false;

  constructor(productDetails) {
    this.#brand = productDetails.brand;
    this.#model = productDetails.model;
  }
  
  displayInfo() {
    const trunkStatus = this.trunk ? "Open" : "Close";

    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h Trunk: ${this.trunk ? "Open" : "Close"}`);
  }

  go() {
    
    if (this.trunk === false) {
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }
  
  brake() {
    this.speed -= 5;
    
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  
  trunkOpen() {
    if (this.speed === 0){ 
      this.trunk = true;
    }
  }

  trunkClose() {
    if (this.speed === 0){ 
      this.trunk = false;
    }
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(productDetails) {
    super(productDetails);
    this.acceleration = productDetails.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model} Speed: ${this.speed} km/h`);
  }

  go() {
      this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }
  
  brake() {
    this.speed -= 5;
    
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  trunkOpen() {
    console.log('Racecars does\'nt have a trunk');
  }

  trunkClose() {
    console.log('Racecars does\'nt have a trunk');
  }
}

export const cars = [{
  brand: 'Toyota',
  model: 'Supra',
},{
  brand: 'Nissan',
  model: 'R34 Skyline',
},{
  brand: 'Mclaren',
  model: 'P1 GTR',
  acceleration: 10
},{
  brand: 'Ferrari',
  model: 'FXXK EVO',
  acceleration: 10
}].map( (car) => {
  if (car.acceleration) {
    return new RaceCar(car);
  }
  return new Car(car);
})


cars[0].go();
cars[0].displayInfo();

cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].trunkOpen();
cars[2].displayInfo();

// console.log(cars);