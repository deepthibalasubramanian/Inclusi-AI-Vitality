"use client"
import { Check, Plus, Send } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/avatar"
import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { Input } from "@/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip"
import { Loading, LoadingCircle } from "./ui/loading"

const threads = [
  {
    name: "Depression",
    content: "How to overcome depression",
    avatar: "/avatars/01.png",
  },
  {
    name: "Anxiety",
    content: "How to overcome Anxiety",
    avatar: "/avatars/03.png",
  },
  {
    name: "Anger",
    content: "How to overcome Anger",
    avatar: "/avatars/05.png",
  },
  {
    name: "Demotivation",
    content: "How to overcome demotivation",
    avatar: "/avatars/02.png",
  },
  {
    name: "Loneliness",
    content: "How to overcome loneliness",
    avatar: "/avatars/04.png",
  },
]


export function CardsChat() {
  const [open, setOpen] = React.useState(false)
  const [selectedThreads, setSelectedThreads] = React.useState([])

  const [messages, setMessages] = React.useState([
    {
      "role":"agent",
      "content":"Hello, I am your AI Mental Health Advisor. How can I help you today? Please feel free to share any problems or worries you have, and I'll do my best to provide advice and remedies to support your mental health."
    },
  ])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const inputLength = input.trim().length

  React.useEffect(() => {
    console.log('Initial Prompt triggered');
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({prompt:""})
        });

        if (response.ok) {
          // Handle the response here
          const data = await response.json();
          console.log(data);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmitHandler =  async (event) => {
    event.preventDefault()
    if (inputLength === 0) return
    setIsError(false)
    console.log(JSON.stringify({ prompt: input }))
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ])

    setIsLoading(true)
    setInput("")
    try{
      
      const body =  await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: input })
      })

      setIsLoading(false)
      const response = await body.json()

      console.log(response.response)
      setMessages((prevmes) => [
        ...prevmes,
        {
          role: "agent",
          content: response.response,
        },
      ])

      setInput("")
    }catch(error){
      setIsError(true)
      setInput("")
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Aviral Srivastava</p>
              <p className="text-sm text-muted-foreground">meaviral17@gmail.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length !== 0 && (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >

                    <p className={cn(
                      message.role === "user"
                        ? "text-right"
                        : "text-left"
                    )}>
                      {message.content}
                    </p>
                  </div>
              ))
            )}
          </div>
          {isLoading && <Loading/>}
          {isError && <p>Something went wrong...</p>}
        </CardContent>
        <CardFooter>
          <form
            onSubmit={onSubmitHandler}
            className="flex items-center w-full space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            {isLoading ? (
              <Button size='icon' disabled={true}>
                <LoadingCircle/>
                <span className="sr-only">Loading</span>
              </Button>
            ) :
              (<Button type="submit" size="icon" disabled={inputLength === 0}>
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>)}
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pt-5 pb-4">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Select a thread which you want to continue
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden border-t rounded-t-none">
            <CommandInput placeholder="Search thread..." />
            <CommandList>
              <CommandEmpty>No threads found.</CommandEmpty>
              <CommandGroup className="p-2">
                {threads.map((thread) => (
                  <CommandItem
                    key={thread.content}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedThreads.includes(thread)) {
                        return setSelectedThreads(
                          selectedThreads.filter(
                            (selectedThread) => selectedThread !== thread
                          )
                        )
                      }

                      return setSelectedThreads(
                        [...threads].filter((u) =>
                          [...selectedThreads, thread].includes(u)
                        )
                      )
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={thread.avatar} alt="Image" />
                      <AvatarFallback>{thread.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {thread.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {thread.content}
                      </p>
                    </div>
                    {selectedThreads.includes(thread) ? (
                      <Check className="flex w-5 h-5 ml-auto text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center p-4 border-t sm:justify-between">
            {selectedThreads.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedThreads.map((thread) => (
                  <Avatar
                    key={thread.content}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={thread.avatar} />
                    <AvatarFallback>{thread.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select thread to add.
              </p>
            )}
            <Button
              disabled={selectedThreads.length < 2}
              onClick={() => {
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}