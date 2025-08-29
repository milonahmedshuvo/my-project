import Buttom from "@/components/atoms/buttom/Buttom";
import InputFiled from "@/components/atoms/inputFiled/InputFiled";
import React from "react";
import styles from "@/components/molecules/form/Form.module.css";
import HomeHeader from "../homeHeader/homeHeader";
import { error } from "console";


type FromProps = {
  url: string,
  setUrl: (url:string) => void;
  loading: boolean,
  error: string | null,
  onAnalytice: () => void,
  buttonText: string
}


const Form = ({url, setUrl, loading, onAnalytice, buttonText, error }:FromProps) => {


  return (
      <div className={styles.formContainer}>

       <HomeHeader 
        headerTitle='Enter Website URL' 
        subTitle='Enter the URL of the website you want to analyze' 
        titleVariant="inputTitle" 
        subTitleVariant="small"
         />
       
        <div className={`${styles.container}`} > 
        <InputFiled
          url={url}
          loading={loading}
          onChangeUrl={setUrl}
        ></InputFiled>
        
        <Buttom buttonWorking={onAnalytice} variant="mediam">
          {buttonText}
        </Buttom>
        </div>

        {
          error && <p style={{color: 'red', marginTop: '0.5rem'}} > {error} </p>
        }

      </div>
  );
};

export default Form;
