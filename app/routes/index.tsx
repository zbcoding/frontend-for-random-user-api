
import styles from "~/styles/index.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from "remix";
import { Avatar, Grid, Container, VStack, HStack, GridItem, Box, Center, ChakraProvider, Circle, CSSReset, Heading, Text, ThemeProvider, SimpleGrid, Divider, Input, Flex } from '@chakra-ui/react'
import { Person } from "~/classes/Person";
import { PersonBox } from "~/components/PersonBox";
import React from "react";


export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {

  let persons = getPersons();

  const [searchText, setValue] = React.useState('');
  const inputSearchChange = (event: any) => {
    setValue(event.target.value);
  };

  persons = persons.filter((person: Person) => {
    if (
      (`${person.name.first}` + `${person.name.last}`)
        .toLocaleLowerCase().includes(searchText.split(" ").join(""))
    ) { return true }
  });

  return (
    <>

      <div className="container">
        <Center>
          <Box>
            <Input placeholder='Search by name'
              position={'sticky'}
              border='none'
              onChange={inputSearchChange}
            >
            </Input>
            <Center>
              <Box width={'90%'}>
                <Divider></Divider>
              </Box>
            </Center>
          </Box>
        </Center>
      
        <Center>
          <div className="scroll-container">
            <Center>
              <Box width={'800px'}
                scrollBehavior={'smooth'}
                scrollMargin={'1'}
                borderRadius={'15px'}
              >

                {persons.map((person: Person, index: number) => (
                  <div key={index}>
                    <PersonBox person={person} />
                  </div>
                ))}
              </Box>
            </Center>






          </div>
        </Center>
      </div>
    </>
  );
}


export async function loader() {
  let res = await fetch(`https://randomuser.me/api/?results=20`);
  if (res.status >= 200 && res.status <= 299) {
    let response = await res.json();
    return response;
  } else {
    console.error(res.status, res.statusText);
    return
  }
}

function getPersons() {
  return useLoaderData().results;
}

