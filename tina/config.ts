import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Service Name",
            required: true,
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price ($)",
            required: true,
          },
          {
            type: "string",
            name: "duration",
            label: "Duration",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "event",
        label: "Events",
        path: "content/events",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Event Name",
            required: true,
          },
          {
            type: "string",
            name: "teaser",
            label: "Teaser",
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price ($)",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date & Time",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Location",
            required: true,
          },
          {
            type: "number",
            name: "capacity",
            label: "Capacity",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
        ],
      },
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "text",
            label: "Testimonial Text",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "role",
            label: "Role",
            required: true,
          },
        ],
      },
    ],
  },
});
