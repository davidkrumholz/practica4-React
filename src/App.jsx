import { useState } from "react";
import "./App.css";
import moment from "moment/moment";

function App() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(moment().format("YYYY-MM-DD"));
  const [profileImg, setProfileImage] = useState("");
  const [persons, setPersons] = useState([]);

  const currentDate = moment();

  const addPerson = () => {
    const person = {
      id: persons.length + 1,
      name: name,
      dateOfBirth: dateOfBirth,
      profileImg: profileImg,
    };
    console.log(person);
    setPersons([...persons, person]);
  };

  const calculateAge = (dateOfBirth) => {
    return currentDate.diff(dateOfBirth, "years")
  }

  const calculateTime = (dateOfBirth) => {
    let fechaNac = moment(dateOfBirth, "'YYYY-MM-DD')");
    let proxCumple = moment(currentDate).set({
      year: currentDate.year(),
      month: fechaNac.month(),
      date: fechaNac.date()
    });

    if(currentDate.isAfter(proxCumple)) {
      proxCumple.add(1, "years");
    }

    const difference = proxCumple.diff(currentDate, 'days');
    return difference;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card bg-dark text-white rounded">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label for="name">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Nombre"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="dateofbirth">Fecha de nacimiento</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateofbirth"
                      placeholder="Fecha de nacimiento"
                      name="dateofbirth"
                      onChange={(event) => setDateOfBirth(event.target.value)}
                      value={dateOfBirth}
                    />
                  </div>
                  <div className="form-group">
                    <label for="profileImg">Foto de pefil</label>
                    <input
                      type="text"
                      className="form-control"
                      id="profileImg"
                      placeholder="Foto de perfil"
                      name="profileImg"
                      onChange={(event) => setProfileImage(event.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={addPerson}
                  >
                    Agregar
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {persons.map((person) => {
              const {id, name, profileImg, dateOfBirth} = person;
              return (
                <div class="card flex-row flex-wrap mb-3">
                <div class="card-header border-0">
                  <img src={profileImg} alt="" />
                </div>
                <div class="card-block px-2 d-flex flex-column m-5 justify-content-center">
                  <h4 class="card-title">{name}</h4>
                  <p class="card-text">Edad: {calculateAge(dateOfBirth)}</p>
                  <p class="card-text">días para cumpleaños: {calculateTime(dateOfBirth)}</p>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
