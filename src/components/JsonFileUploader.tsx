import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { keyframes } from '@mui/system';
import { Typography, Box } from '@mui/material';

const languages = ['fr', 'en', 'de', 'es'];

// Define the keyframes for the border color animation
const animateColor = keyframes`
  0% { border-color: red; }
  25% { border-color: yellow; }
  50% { border-color: blue; }
  75% { border-color: green; }
  100% { border-color: red; }
`;

// Define the keyframes for the rotation animation
// const animateRotation = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

const JsonFileUploader = () => {
  const [data, setData] = useState<any>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const jsonData = JSON.parse(text);
      const processedData = processFileData(jsonData);
      setData(processedData);
    };
    reader.readAsText(file);
  };

  const processFileData = (dataGlobal: any) => {
    return languages.map((language) => {
      let json = {
        showAttributes: dataGlobal.showAttributes,
        products: [],
        areas: [],
        categories: [],
        versionPdf: dataGlobal.versionPdf,
      };

      dataGlobal.areas.forEach((area: any) => {
        const formattedArea = {
          id: area.id,
          label: area[language] ? area[language] : area.label,
        };
        json.areas.push(formattedArea);
      });

      dataGlobal.categories.forEach((category: any) => {
        const contentCategoryLanguage =
          'content_category_' + language.toUpperCase();
        const formattedCategory = {
          id: category.id,
          label: category[language] ? category[language] : category.label,
          parent: category.parent,
          content_category: category[contentCategoryLanguage],
        };
        json.categories.push(formattedCategory);
      });

      dataGlobal.products.forEach((product: any) => {
        const imageLanguage = 'image_' + language.toUpperCase();
        const formattedProduct = {
          id: product.id,
          link_type: product.link_type,
          item_code: product.item_code,
          family_code: product.family_code,
          featured_code: product.featured_code,
          start_date: product.start_date,
          end_date: product.end_date,
          offer: product.offer,
          sponsored: product.sponsored,
          focus: product.focus,
          [imageLanguage]: product[imageLanguage],
          image: product.image,
          supplier: product.supplier,
          [language + '_teaser']: product[language]._teaser
            ? product[language]._teaser
            : product.en_teaser,
          [language + '_bullet']: product[language].bullet
            ? product[language].bullet
            : product.bullet,
          countries: product.countries,
          categories: product.categories,
          areas: product.areas,
          url: product.url,
          [language]: {
            title: product[language].title,
            offer: product.offer,
            bullet: product[language].bullet,
            teaser: product[language].teaser,
            tableTitle: product[language].tableTitle,
            tableContent: product[language].tableContent,
          },
          discounts: product.discounts,
        };

        json.products.push(formattedProduct);
      });

      return json;
    });
  };

  const downloadFile = (json: any, language: string) => {
    const dataStr = JSON.stringify(json, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataUri);
    downloadLink.setAttribute('download', `${language}.json`);
    downloadLink.click();
  };

  const downloadAllFiles = () => {
    data.forEach((item: any, index: number) => {
      downloadFile(item, languages[index]);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        style={{ padding: '10px' }}
      />
      {data.map((item: any, index: number) => (
        <Card key={index} sx={{ mb: 10 }}>
          <CardContent>
            <Typography variant="h5">JSON {languages[index]}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Box
              sx={{
                alignContent: 'center',
                display: 'flex',
                p: 3,
              }}>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadAllFiles}
                sx={{
                  borderColor: 'red',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  animation: `${animateColor} 2s linear infinite`,
                  '&:hover': {
                    backgroundColor: '#fff', // white background on hover
                    color: 'blue', // blue text on hover
                  },
                }}>
                Download
              </Button>
            </Box>
          </CardActions>
        </Card>
      ))}
      {data.length ? (
        <>
          <Card sx={{ mb: 10 }}>
            <CardContent>
              <Typography variant="h5">All JSON files </Typography>
            </CardContent>
            <CardActions>
              <Box
                sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  display: 'flex',
                  p: 3,
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={downloadAllFiles}
                  sx={{
                    borderColor: 'red',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    animation: `${animateColor} 2s linear infinite`,
                    '&:hover': {
                      backgroundColor: '#fff', // white background on hover
                      color: 'blue', // blue text on hover
                    },
                  }}>
                  Download All JSON Files
                </Button>
              </Box>
            </CardActions>
          </Card>
        </>
      ) : undefined}
    </div>
  );
};

export default JsonFileUploader;
