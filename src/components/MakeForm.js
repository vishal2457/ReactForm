import React, { Fragment, useState, useEffect } from "react";
import { Input, Label } from "./UI";

const MakeForm = (props) => {
  const { form, getValue, showValidators, data } = props;
  var obj = {};
  for (let i of form) {
    obj[[Object.keys(i)[0]]] = i[Object.keys(i)[0]];
  }
  const [formState, setformState] = useState(obj);

  useEffect(() => {
    getValue({ data: formState });

    if (data != null || data != undefined) {
      setformState(data);
    }
    return () => {};
  }, [formState]);

  const onChange = (e) => {
    //  console.log(e.target, "this is target input");
    if (e.target.type == "checkbox") {
      setformState({ ...formState, [e.target.name]: e.target.checked });
    } else {
      setformState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const verifyPattern = (regex, value) => {
    if (regex.test(value)) return true;
    return false;
  };

  const checkRequired = (value) => {
    if (value == "" || !value) return false;
    return true;
  };
  return (
    <Fragment>
      
        {form.map((key, i) => {
          const {
            label,
            placeholder,
            className,
            col,
            disabled,
            arr,
            bindValue,
            bindName,
            validators,
            type,
          } = key;
          return (
            <div
              key={i}
              className={col ? `${Object.keys(col).map(e => `col-${e}-${col[e]}` )}` : 'col-md-6'}
            >
              <div className="form-group">
                {type == "checkbox" ? (
                  <Fragment>
                    {/* apply styles for checkbox  */}
                    <div className="d-flex form-check">
                    <Input
                      className={className}
                      value={formState[Object.keys(key)[0]]}
                      name={Object.keys(key)[0]}
                      id={Object.keys(key)[0]}
                      onChange={onChange}
                      placeholder={placeholder}
                      disabled={disabled}
                      type={type}
                      arr={arr}
                      bindValue={bindValue}
                      bindName={bindName}
                    />
                    <Label className="form-check-label" label={label.name} required={label.required} forLabel={Object.keys(key)[0]} />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Label label={label.name} required={label.required} />
                    <Input
                      className={className}
                      value={formState[Object.keys(key)[0]]}
                      name={Object.keys(key)[0]}
                      onChange={onChange}
                      placeholder={placeholder}
                      disabled={disabled}
                      type={type}
                      arr={arr}
                      bindValue={bindValue}
                      bindName={bindName}
                    />
                  </Fragment>
                )}

                {validators && validators.length == 1 && showValidators ? (
                  <Fragment>
                    {Object.keys(validators[0])[0] == "required" &&
                    validators[0].required &&
                    formState[Object.keys(key)[0]] == "" ? (
                      <div>
                        <span className="error-text">
                          {validators[0].message}
                        </span>
                      </div>
                    ) : null}
                  </Fragment>
                ) : null}
                {validators && validators.length > 1 && showValidators
                  ? validators.map((val, i) => {
                      // console.log(val,"this are validators");
                      return (
                        <Fragment key={i}>
                          {Object.keys(val)[0] == "required" &&
                          val.required &&
                          !checkRequired(formState[Object.keys(key)[0]]) ? (
                            <div>
                              <span className="error-text">{val.message}</span>
                            </div>
                          ) : val &&
                            Object.keys(val)[0] == "pattern" &&
                            !verifyPattern(
                              val.pattern,
                              formState[Object.keys(key)[0]]
                            ) ? (
                            <div>
                              <span className="error-text">{val.message}</span>
                            </div>
                          ) : null}
                        </Fragment>
                      );
                    })
                  : null}
              </div>
            </div>
          );
        })}
  
    </Fragment>
  );
};

export default MakeForm;
