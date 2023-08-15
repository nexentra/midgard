import Form from "../Utils/Form";
import CardProfile from "../Cards/CardProfile";

const SettingComponent = (props) => {
  console.log(props)
    return ( <>
        <div className="flex flex-wrap">
          <div className={`w-full lg:w-`+props.formWidth +` px-4`}>
            <Form
              formName={props.formName}
              formTitle={props.formTitle}
              formElements={props.formElements}
              HandleDeleteFunc={props.HandleDeleteFunc}
            />
          </div>
          {/* <div className="w-full lg:w-4/12 px-4">
            <CardProfile />
          </div> */}
        </div>
      </> );
}
 
export default SettingComponent;