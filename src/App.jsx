import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [values, setValues] = useState({});
  const [bmi, setBmi] = useState(0);
  const [valid, setValid] = useState({
    bmi: false,
    message: false,
    height: false,
    weight: false,
    bmi: false,
  });

  function handleChange(event) {
    if (event.target.name === "height") {
      const regex = new RegExp(/\d{3}/g);
      if (
        regex.test(event.target.value) &&
        event.target.value > 140 &&
        event.target.value <= 240
      ) {
        setValid({
          ...valid,
          message: false,
          height: true,
          bmi: false
        });
      } else {
        setValid({
          ...valid,
          message: true,
          height: false,
          bmi: false,
        });
      }
    } else if (event.target.name === "weight") {
      const regex = new RegExp(/^\d\d?\d?\.?\d?\d$/);

      if (
        regex.test(event.target.value) &&
        event.target.value > 30 &&
        event.target.value <= 300
      ) {
        setValid({
          ...valid,
          message: false,
          weight: true,
          bmi: false
        });
      } else {
        setValid({
          ...valid,
          message: true,
          weight: false,
          bmi: false,
        });
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  const renderResult = () => {
    if (valid.height && valid.weight) {
      setValid({
        ...valid,
        bmi: true,
      });
      setBmi(
        (
          parseFloat(values.weight) /
          Math.pow(parseFloat(values.height) / 100, 2)
        ).toFixed(1)
      );
    } else {
      setValid({
        ...valid,
        bmi: false,
      });
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          {/* Professor me ensina com colocar uma outra logo, em vez do react usando extençao .svg */}
        </a>
      </div>
      <h1>Body Mass Index</h1>
      <h2>Adults</h2>
      <hr />
      <div className="card">
        <form className="form">
          <div className="form__heigth">
            <label htmlFor="altura">Heigth</label>
            <br />

            <input
              name="height"
              className={`${valid.height ? "valid" : "invalid"}`}
              value={values.height}
              onChange={handleChange}
              placeholder="cm"
            />
          </div>
          <div className="form__weight">
            <label htmlFor="weight">Weight</label>
            <br />

            <input
              name="weight"
              className={`${valid.weight ? "valid" : "invalid"}`}
              value={values.weight}
              onChange={handleChange}
              placeholder="kg"
            />
          </div>
          <button onClick={renderResult} type="button">
            Calculate
          </button>
          <div>
            {valid.message && (
              <p className="read-the-docs message">Provide a valid height and weight</p>
            )}
          </div>
          <div>
            {valid.bmi && (
              <>
                {" "}
                <p className="bmi-score">BMI Score</p>
                <span className="bmi-result">{bmi}</span>
                {bmi < 18.5 && bmi > 0 ? (
                  <div>Underweight</div>
                ) : bmi >= 18.5 && bmi < 25 ? (
                  <div>Healthy Weight</div>
                ) : bmi >= 25 && bmi < 30 ? (
                  <div>Overweight</div>
                ) : (
                  <div>Obesity</div>
                )}
              </>
            )}
          </div>
        </form>
      </div>
     
      <p className="read-the-docs">
        {" "}
        Click on the React logo to learn more
      </p>
    </div>
  );
}

export default App;
