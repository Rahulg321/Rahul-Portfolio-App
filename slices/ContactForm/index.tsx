import Bounded from "@/components/Bounded";
import ContactFormComponent from "@/components/ContactFormComponent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="flex">
        <ContactFormComponent classname="basis-1/2" />
        <div className="basis-1/2"></div>
      </div>
    </Bounded>
  );
};

export default ContactForm;
