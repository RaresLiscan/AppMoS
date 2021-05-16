import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../colors";
import GoogleButton from 'react-google-button'

const useStyles = makeStyles({
    root: {
        width: '80%',
    },
    button: {
        backgroundColor: '#001c2f',
        color: 'white',
        "&:hover": {
            backgroundColor: colors.red,
            color: colors.white
        }
    },
    googleButton: {
        backgroundColor: "#dbdbdb",
        color: colors.blue5,
        "&:hover": {
            backgroundColor: colors.blue5,
            color: colors.white
        }
    }
})

export default function GeneralForm() {

    const [gdpr, setGdpr] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const classes = useStyles();

    const renderPhone = () => {
        return (
            <TextField id="phone"
                       label="Numar de telefon"
                       fullWidth
                       onChange={event => setPhone(event.currentTarget.value)}
                       value={phone}
            />
        )
    }

    const renderEmail = () => {
        return (
            <TextField id="email"
                       label="Email"
                       fullWidth
                       onChange={event => setEmail(event.currentTarget.value)}
                       value={email}
            />
        )
    }

    const register = () => {

    }

    const handleGdprChange = () => {
        setGdpr(!gdpr);
    }

    const LabelComponent = () => {
        return (
            <p>
                Sunt de acord cu <a href={"https://www.amosed.ro/wp-content/uploads/2020/11/GDPR-Doc_.docx.pdf"}
                                    target={"_blank"}>politica de confidențialitate cu privire la prelucrarea datelor cu
                caracter personal</a>
            </p>
        )
    }

    return (
        <div style={{backgroundColor: 'white', margin: '15px 10%', padding: '1%'}}>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25}}>Inscrie-te la activitate</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="name"
                               label="Nume si prenume"
                               fullWidth
                               onChange={event => setName(event.currentTarget.value)}
                               value={name}
                    />

                    {renderPhone()}
                    {renderEmail()}

                    <FormControlLabel
                        style={{marginTop: '2%', marginBottom: '1%'}}
                        control={
                            <Checkbox
                                checked={gdpr}
                                onChange={handleGdprChange}
                                name="gdpr"
                                color="primary"
                            />
                        }
                        label={<LabelComponent/>}
                    />

                    <div>
                        <Button style={{marginTop: '2%'}} onClick={() => register()} variant="contained"
                                className={classes.button}>
                            Înscrie-te!
                        </Button>
                    </div>
                    <div>
                        <p>Sau</p>
                        <GoogleButton
                            type={"light"}
                            onClick={() => register()}
                            label={"Logheaza-te cu Google"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}