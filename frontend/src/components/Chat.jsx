"use client"
import * as React from "react"
import { Check, Plus, Send } from "lucide-react"

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
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my brain.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log out from depression.",
    },
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Emmanuel Allan</p>
              <p className="text-sm text-muted-foreground">a@example.com</p>
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
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (inputLength === 0) return
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ])
              setInput("")
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Select a thread which you want to continue
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
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
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
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