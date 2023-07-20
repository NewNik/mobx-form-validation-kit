import { FormControl } from './form-control';
import * as React from 'react';
export declare class InputFormControl {
    static bindActions(formControl: FormControl, events?: {
        ref?(element: HTMLInputElement): void;
        onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
        onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
        onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    }): {
        ref: (element: HTMLInputElement) => void;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    };
}
export declare class TextAreaFormControl {
    static bindActions(formControl: FormControl, events?: {
        ref?(element: HTMLTextAreaElement): void;
        onChange?(event: React.ChangeEvent<HTMLTextAreaElement>): void;
        onBlur?(event: React.FocusEvent<HTMLTextAreaElement>): void;
        onFocus?(event: React.FocusEvent<HTMLTextAreaElement>): void;
    }): {
        ref: (element: HTMLTextAreaElement) => void;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
        onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    };
}
