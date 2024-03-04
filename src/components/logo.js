import { useTheme } from '@mui/material/styles';
export const Logo = ({color}) => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    
    <svg
      fill="none"
      height="100%"
      viewBox="4 5 14 12"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
    
      
      <image
        x="4.5"
        y="4"
        width="13"
        height="13"
        xlinkHref="https://github.com/SebastianL2/Metadata/blob/main/escudo-uptc-color.png?raw=true"
      />
      
    </svg>
   
       
   
  );
};
