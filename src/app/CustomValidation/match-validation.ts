import { FormGroup } from '@angular/forms';

export function MustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
        const PasswordControl = formGroup.controls[password];
        const ConfirmPasswordControl = formGroup.controls[confirmPassword];

        if (ConfirmPasswordControl.errors && !ConfirmPasswordControl.errors.mustMatch) {
            return;
        }

        if (PasswordControl.value !== ConfirmPasswordControl.value) {
            ConfirmPasswordControl.setErrors({ mustMatch: true });
        } else {
            ConfirmPasswordControl.setErrors(null);
        }
    }
}