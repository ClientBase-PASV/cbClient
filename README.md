## Getting Started

First, install dependencies,

1. `npm install` in terminal
2. `npm run local` - for testing purposes if it works(compilation of umi started) you are Golden.
Probably You are using MacOS/any sort of Linux . 
You should not need to worry about anything else.

3. If it is Windows case `npm run local` probably will trow in error
`"UMI_ENV is not recognized as an internal or external command"` on the very top of error message.
Hold tight. You need to try not to lose your hope.
Do the following.
 1. Open `File` -> `Settings` -> `Tools ` -> `Terminal` and make sure that in the `Shell path` you have 
 `C:\Program Files\Git\bin\sh.exe`.
 2. Next use `npm config set script-shell "C:\Program Files\git\bin\bash.exe"` command.
 3. Try to run `npm run local` command once again.
 
 All should work now and you can be Golden too. 
 If it is still not working, use your head and hands, possibly Google, even if that did not help - go https://www.apple
 .com/shop/ and get a new Apple MacPC or Laptop. As alternative install and learn Linux Ubuntu any of this will will
  do.
 
 ##There are additional information related to: 
 
  ### Function naming convention
 
 * Camelcase.  
 Good: awsConnection, usaStates 
 Bad: AWSConnection, USAStates, USA_states
 
 * Arguments.
 If function accepts more than one argument — wrap to object
 Good: userDeleteById(id), userDeleteByParams({ name, email })
 Bad: userDeleteByParams(name, email)


