export interface Alert {
  contactBtn?     : boolean;
  hasClose        : boolean;
  hasIcon         : boolean;
  hasMessage      : boolean;
  hasReturnPath?  : boolean;
  hasTitle        : boolean;
  icon            : string;
  message         : string;
  returnPath      : string;
  title           : string;
  width           : number;

  category        : CategoryAlert;
  type            : TypeAlert;
}
export enum CategoryAlert {
  Classic   = 'Classic',
  PopUps    = 'PopUps',
  Undefined = 'Undefined',
}

export enum TypeAlert {
  Alert           = 'alert',
  CustomWarn      = 'customWarn',
  Danger          = 'danger',
  Error           = 'error',
  Info            = 'info',
  Success         = 'success',
  SuccessMessage  = 'successMessage',
  Undefined       = 'undefined',
  Warning         = 'warning',
}
export interface ParametersAlert {
  message?  : string;
  methodNo? : any;
  methodOk? : any;
  title?    : string;
}
