export function getStatusValue(value : any) : boolean | null{
  if(value == 'true') {return true}
  if(value == 'false') {return false}
  return null;
}
