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
          [language]: area[language],
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
          contentCategoryLanguage: category[contentCategoryLanguage],
          [language]: category[language],
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
      {!data.length ? (
        <>
          <Typography variant="h5" sx={{ mt: 10 }}>
            This application will help to optimize the loading of promotions by
            splitting the JSON file into 4 languages.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ color: '#005DAA' }}>
              Upload JSON file
            </Typography>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ padding: '10px' }}
            />
          </Box>
        </>
      ) : undefined}

      {data.length ? (
        <>
          <Typography variant="h5" sx={{ mt: 10 }}>
            Your file has been processed successfully. You can download the 4
            JSON files.
          </Typography>
          <Card sx={{ mb: 5, mt: 5 }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#005DAA' }}>
                Download JSON files in French, English, German and Spanish
                languages
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
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
                    color: '#005DAA', // blue text on hover
                  },
                }}>
                Download
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ mb: 10 }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#005DAA' }}>
                Upload a new JSON file for a new campaign
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => setData([])}
                  sx={{
                    borderColor: 'red',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    animation: `${animateColor} 2s linear infinite`,
                    '&:hover': {
                      backgroundColor: '#fff', // white background on hover
                      color: '#005DAA', // blue text on hover
                    },
                  }}>
                  Upload
                </Button>
              </CardActions>
            </Box>
          </Card>
        </>
      ) : undefined}
    </div>
  );
};

export default JsonFileUploader;
