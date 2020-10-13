import React, {Fragment, useState} from 'react'
import {ExampleForm} from "./ExampleForm"

const loadMakeForm = () => import("./components/MakeForm");
const MakeForm = React.lazy(loadMakeForm);

function Demo() {
    const [formType, setformType] = useState("List");
    const [formData, setformData] = useState(null);
    const [data, setdata] = useState(null)
    const [showValidators, setshowValidators] = useState(false);
  

    const toggleForm = () =>
      formType == "List" ? setformType("Add") : setformType("List");
    const getValue = (data) => setformData(data);
    const onsubmit = () => {
      console.log(formData, "this is data");
      setshowValidators(true);
    };

    return (
        <div>
    <div
      onMouseEnter={loadMakeForm}
      className="d-flex justify-content-between m-0"
    >
      <h5 className="mb-0">Demo</h5>
      <button onClick={toggleForm} className="btn">
        {formType == "List" ? "Add" : "Cancel"}
      </button>
    </div>
         {formType == "List" ? (
            <p>List view</p>
          ) : (
            <Fragment>
              <div className="row">
              <MakeForm
                form={ExampleForm}
                getValue={getValue}
                showValidators={showValidators}
                data={data}
              />
              </div>
              
              <div className="text-right">
                <button onClick={onsubmit}>Submit</button>
              </div>
            </Fragment>
          )}
        </div>
    )
}

export default Demo
