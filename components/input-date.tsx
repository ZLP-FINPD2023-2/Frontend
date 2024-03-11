import React from 'react';  
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  
  
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
import { cn } from '@/lib/utils';
import { ru } from 'date-fns/locale';

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Button } from './ui/button';
import { format } from "date-fns"

interface DateInputProps {
    form: any
    field: string
    label: string;
  }

  const InputDate: React.FC<DateInputProps> = ({ form, field, label }) => {
    return (
        <FormField
                    control={form.control}
                    name={field}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{label}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value &&
                                    "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ru,
                                  })
                                ) : (
                                  <span>Укажите дату</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
    );
  };
  
  export default InputDate;