import React from "react";
import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../Common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../Common/FormControls/FormControls.module.css'

export const LoginForm = (props) => {
    return (
            <form action="" onSubmit={props.handleSubmit}>
                <div><Field component={Input} name={'email'} type={'email'} placeholder={'Email...'} validate={[required]}/></div>
                <div><Field component={Input} name={'password'} type={'password'} placeholder={'Password...'} validate={[required]}/></div>
                <div><Field component={Input} name={'rememberMe'} type={'checkbox'}/>Remember me</div>

                {props.captchaURL && <img src={props.captchaURL}/>}
                {props.captchaURL && CreateField("Symbols...", 'captcha', [required], Input)}
                { props.error && <div className={style.formSummaryError}>{props.error}</div>}
                <div><button>Log in</button></div>
            </form>
    )
}

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha )
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)