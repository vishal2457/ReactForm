import React, { useState, Fragment } from "react";

export const Button = (props) => {
  const { children, variant, onClick, type, className } = props;
  return (
    <button
      className={`btn btn-sm btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

const renderInput = (props) => {
  const {
    onChange,
    type,
    placeholder,
    name,
    className,
    value,
    disabled,
    arr,
    bindValue,
    bindName,
    id
  } = props;
  switch (props.type) {
    case "textarea":
      return (
        <textarea
          className={`form-control form-control-sm ${ className}`}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      );
    case "dropdown":
      return (
        <Dropdown
        {...props}
          
        />
      );
    case "checkbox":    
      return (
        <input
          className={`form-check-input ${ className}`}
          type={type}
          placeholder={placeholder}
          name={name}
          defaultChecked={value}
          disabled={disabled}
          onChange={onChange}
          id={id}
        />
      );
    case 'radio':
    return  <input
      className={`form-control form-control-sm ${ className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      checked={value}
      disabled={disabled}
      onChange={onChange}
    />
    default:
      return (
        <input
          className={`form-control form-control-sm ${className}`}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      );
  }
};

export const Input = (props) => {
  return <Fragment>{renderInput(props)}</Fragment>;
};

export const Label = (props) => {
  const { className, label, required, forLabel } = props;
  return (
    <label className={`main-label text-muted ${className}`} htmlFor={forLabel}>
      {label}
      {required ? <span style={{ color: "red" }}>*</span> : null}
    </label>
  );
};

export const Card = (props) => {
  const { children, className } = props;
  return <div className={`card ${className}`}>{children}</div>;
};

export const CardHeader = (props) => {
  const { children, className } = props;
  return <div className="card-header"><div className={`card-title ${className}`}> {children} </div></div>;
};

export const CardBody = ({ children, className }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

export const Dropdown = (props) => {
  var { onChange, arr, bindValue, bindName, disabled, name } = props;
  const [state, setstate] = useState({
    openList: false,
  });

  const toggleOptions = () => setstate({ openList: !state.openList });

  return (
    <Fragment>
      {/* <div>
        <input
          className="form-control form-control-sm"
          type="text"
          onFocus={toggleOptions}
          onBlur={() => setTimeout(toggleOptions, 200)}
        />
        {state.openList ? (
            <div className="card shadow">
                {arr && arr.map((m, i) => {
                    return <li> {m[bindName]}</li>
                })}
               
                </div>
        )  : null}
      </div> */}

      <select
        onChange={onChange}
        className="form-control"
        disabled={disabled}
        name={name}
      >
        <option>Select</option>
        {arr &&
          arr.map((m, i) => {
            return (
              <option value={m[bindValue]} key={i}>
                {m[bindName]}
              </option>
            );
          })}
      </select>
    </Fragment>
  );
};
