import { Person } from "~/classes/Person";
import { Avatar, Grid, Container, VStack, Input, HStack, GridItem, Box, Center, ChakraProvider, Circle, CSSReset, Heading, Text, ThemeProvider, SimpleGrid, Divider, Button, ButtonGroup, UnorderedList, ListItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


export function PersonBox({
  person,
}: {
  person: Person;
}) {

  let initialTagArray: string[]= [];
  let loginArray = [person.login.uuid, person.login.username, person.login.password];
  const [expanded, setExpanded] = useState(false);
  const [tagInputTextValue, setTagInputTextValue] = useState('');
  const [tagArray, setTagArray] = useState(initialTagArray);

  function handleTagChange(event: any) {
    setTagInputTextValue(event.target.value);
  }

  function onKeyUp(event: any) {
    if (event.key === "Enter" && tagInputTextValue.replace(/\s/g,'').length > 0) {
      tagArray.push(tagInputTextValue)
      setTagArray(tagArray);
      setTagInputTextValue('');
      useEffect(() => {
        window.localStorage.setItem('tagArray', JSON.stringify(tagArray));
      }, [tagArray])
    }
  }
  //console.log(person);
  return (
    <div className="persons-div">
      <Box className='person-box'
  
        marginTop={'10px'}
        marginBottom={'10px'}
      >

        <HStack spacing={'35px'}>

          <Box className="avatar"
            paddingLeft={'20px'}
            position='inherit'
          >
            <Circle border={'1px'}>
              <Avatar
                name={person.name.first + " " + person.name.last}
                loading='lazy'
                size='2xl' src={person.picture.large} bg='white'>
              </Avatar>
            </Circle>
          </Box>
          <Box className="person-info" width={'60%'}>
            <Box float={'right'} className="expand-person-info">
              <button onClick={() => { setExpanded(!expanded); console.log(expanded) }} className="add-button">
                {!expanded ? <FontAwesomeIcon icon={faPlus} size="2x" /> : <FontAwesomeIcon icon={faMinus} size="2x" />}
              </button>
            </Box>
            <Box className="person-name">

              <Text className="person-name-text"
                fontSize="xx-large"
                fontWeight={"bold"}
              >
                {(person.name.first + " " + person.name.last).toUpperCase()}
              </Text>
            </Box>
            <Box className="person-other-info"
              ml={'10%'}
              textAlign={'left'}>
              <Text>Email: {person.email}</Text>
              <Text>Nat: {person.nat}</Text>
              <Text>Phone: {person.phone}</Text>
              <Text>Random Number: {getPhoneNumberAverage(person.phone)}</Text>
              {expanded && 
                <Box className="person-expanded-login" marginTop={'10px'}>
                <Text>User Login Information</Text>
                <UnorderedList>
                {
                loginArray.map((item: string, index) => (
                  <ListItem>{item}</ListItem>
                ))}
                </UnorderedList>
              </Box>}
              {tagArray.length > 0 && <Box className="person-tags">
            
                <ButtonGroup

                  spacing={'1'}>
                  {tagArray.map((tag: string) => (
                    <Button
                      cursor='default'
                      _active={{}}
                      _hover={{}}
                      _focus={{}}
                    >{tag}</Button>
                  ))}
                </ButtonGroup>
              </Box>}
              <Input
                variant={'flushed'}
                value={tagInputTextValue}
                onChange={handleTagChange}
                onKeyPress={onKeyUp}
                placeholder='Add a tag' />

            </Box>

          </Box>

        </HStack>

      </Box>
      <Divider />
    </div>
  )
}

function getPhoneNumberAverage(personNumber: string) {
  var sum = 0;
  personNumber = personNumber.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  for (let c of personNumber) {
    sum = sum + Number(c);
  }
  let average = sum/personNumber.length
  return average.toFixed(2);
}

