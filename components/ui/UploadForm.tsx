"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  pdf: z.any().refine((file) => file instanceof File, "PDF is required"),
  cover: z.any().optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voice: z.string().min(1, "Please select an assistant voice"),
});

export default function BookUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Form values:", values);
    setIsSubmitting(false);
  };

  return (
    <div className="new-book-wrapper">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pdf"
            render={({ field }) => (
              <FormItem>
                <div className="text-sm text-gray-500 mb-2">
                  5 of 10 books used (Upgrade)
                </div>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <div
                    className={`upload-dropzone ${field.value ? "upload-dropzone-uploaded" : ""}`}
                    onClick={() =>
                      document.getElementById("pdf-upload")?.click()
                    }
                  >
                    {!field.value ? (
                      <>
                        <Upload className="upload-dropzone-icon" />
                        <div className="upload-dropzone-text">
                          Click to upload PDF
                        </div>
                        <div className="upload-dropzone-hint">
                          PDF file (max 50MB)
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                          <span className="upload-dropzone-text font-semibold">
                            {field.value.name}
                          </span>
                          <X
                            className="upload-dropzone-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(undefined);
                            }}
                          />
                        </div>
                        <div className="upload-dropzone-hint">
                          Ready to synthesize
                        </div>
                      </div>
                    )}
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 50 * 1024 * 1024) {
                            form.setError("pdf", {
                              message: "File exceeds 50MB",
                            });
                            return;
                          }
                          form.clearErrors("pdf");
                          field.onChange(file);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Cover Image (Optional)
                </FormLabel>
                <FormControl>
                  <div
                    className={`upload-dropzone ${field.value ? "upload-dropzone-uploaded" : ""}`}
                    onClick={() =>
                      document.getElementById("cover-upload")?.click()
                    }
                  >
                    {!field.value ? (
                      <>
                        <ImageIcon className="upload-dropzone-icon" />
                        <div className="upload-dropzone-text">
                          Click to upload cover image
                        </div>
                        <div className="upload-dropzone-hint">
                          Leave empty to auto-generate from PDF
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                          <span className="upload-dropzone-text font-semibold">
                            {field.value.name}
                          </span>
                          <X
                            className="upload-dropzone-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(undefined);
                            }}
                          />
                        </div>
                        <div className="upload-dropzone-hint">
                          Custom cover selected
                        </div>
                      </div>
                    )}
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Rich Dad Poor Dad"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Robert Kiyosaki"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label mb-4">
                  Choose Assistant Voice
                </FormLabel>

                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      Male Voices
                    </div>
                    <div className="voice-selector-options flex-col md:flex-row">
                      {[
                        {
                          id: "dave",
                          name: "Dave",
                          desc: "Young male, British-Essex, casual & conversational",
                        },
                        {
                          id: "daniel",
                          name: "Daniel",
                          desc: "Middle-aged male, British, authoritative but warm",
                        },
                        {
                          id: "chris",
                          name: "Chris",
                          desc: "Male, casual & easy-going",
                        },
                      ].map((voice) => (
                        <FormItem key={voice.id} className="flex-1">
                          <FormControl>
                            <RadioGroupItem
                              value={voice.id}
                              className="hidden"
                            />
                          </FormControl>
                          <div
                            className={`voice-selector-option block w-full text-left cursor-pointer ${field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"}`}
                            onClick={() => field.onChange(voice.id)}
                          >
                            <div className="flex gap-3">
                              <div className="!mt-1">
                                <div
                                  className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center ${field.value === voice.id ? "bg-primary" : ""}`}
                                >
                                  {field.value === voice.id && (
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900">
                                  {voice.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {voice.desc}
                                </div>
                              </div>
                            </div>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      Female Voices
                    </div>
                    <div className="voice-selector-options flex-col md:flex-row">
                      {[
                        {
                          id: "rachel",
                          name: "Rachel",
                          desc: "Young female, American, calm & clear",
                        },
                        {
                          id: "sarah",
                          name: "Sarah",
                          desc: "Young female, American, soft & approachable",
                        },
                      ].map((voice) => (
                        <FormItem key={voice.id} className="flex-1">
                          <FormControl>
                            <RadioGroupItem
                              value={voice.id}
                              className="hidden"
                            />
                          </FormControl>
                          <div
                            className={`voice-selector-option block w-full text-left cursor-pointer ${field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"}`}
                            onClick={() => field.onChange(voice.id)}
                          >
                            <div className="flex gap-3">
                              <div className="!mt-1">
                                <div
                                  className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center ${field.value === voice.id ? "bg-primary" : ""}`}
                                >
                                  {field.value === voice.id && (
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900">
                                  {voice.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {voice.desc}
                                </div>
                              </div>
                            </div>
                          </div>
                        </FormItem>
                      ))}
                    </div>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="form-btn mt-8"
            disabled={isSubmitting}
          >
            Begin Synthesis
          </button>
        </form>
      </Form>

      {isSubmitting && (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper">
            <div className="loading-shadow bg-white p-8">
              <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
              <div className="loading-title">Synthesizing...</div>
              <div className="loading-progress">
                <div className="loading-progress-item">
                  <div className="loading-progress-status" />
                  <span>Processing document</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
