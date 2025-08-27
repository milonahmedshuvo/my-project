import Buttom from "@/components/atoms/buttom/Buttom";
import InputFiled from "@/components/atoms/inputFiled/InputFiled";
import React from "react";
import styles from "@/components/molecules/form/Form.module.css";

const Form = () => {
  const websiteAnalytice = () => {};

  return (
    <div>
        
      <div className={styles.container}> 
        <InputFiled
          url={"ddd"}
          loading={false}
          onChangeUrl={() => {}}
        ></InputFiled>
        
        <Buttom buttonWorking={websiteAnalytice} variant="mediam">
          Analytice
        </Buttom>
      </div>
    </div>
  );
};

export default Form;
