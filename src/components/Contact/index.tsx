"use client"
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { errorHandler, useClient } from "@/app/_utils/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Contact = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const httpClient = useClient(null);
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstname || !lastname || !subject || !email || !message) {
      return
    }
    try {
      const response = await httpClient.post('/contact-us/', {
        firstname,
        lastname,
        subject,
        email: "mickeypercy1000@gmail.com",
        message,
        senderEmail: email
      });
      if (response.data.status) {
        toast.success(response.data.message)
        router.push('/mail-success')
      }
      console.log(response.data)
    } catch(error) {
      errorHandler(error)
    }
  }

  return (
    <>
      <Breadcrumb title={"Contact"} pages={["contact"]} />

      <section className="overflow-hidden py-15 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                <p className="font-medium text-xl text-dark">
                  Contact Information
                </p>
              </div>

              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">
                  

                  <p className="flex items-center gap-4">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1559 1.72346C12.2166 1.34865 12.571 1.09439 12.9458 1.15507C12.969 1.15951 13.0436 1.17346 13.0827 1.18217C13.161 1.19959 13.2701 1.22641 13.4061 1.26604C13.6781 1.34528 14.0582 1.47581 14.5143 1.68494C15.4276 2.10363 16.6429 2.83605 17.9041 4.0972C19.1652 5.35835 19.8977 6.57368 20.3163 7.48693C20.5255 7.94308 20.656 8.32314 20.7352 8.59518C20.7749 8.73122 20.8017 8.84033 20.8191 8.91855C20.8278 8.95766 20.8342 8.98907 20.8386 9.01227L20.8439 9.04086C20.9046 9.41568 20.6526 9.78465 20.2778 9.84533C19.9041 9.90584 19.552 9.65281 19.4898 9.27975C19.4879 9.26974 19.4826 9.24283 19.477 9.21745C19.4657 9.16668 19.4461 9.08617 19.4151 8.9797C19.3531 8.76672 19.2453 8.45017 19.0664 8.05997C18.7091 7.28052 18.0665 6.20418 16.9318 5.06947C15.7971 3.93477 14.7208 3.29219 13.9413 2.93484C13.5511 2.75595 13.2346 2.64821 13.0216 2.58618C12.9151 2.55516 12.7813 2.52445 12.7305 2.51314C12.3575 2.45097 12.0954 2.09721 12.1559 1.72346Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.3633 4.88547C12.4677 4.52039 12.8482 4.30899 13.2133 4.4133L13.0244 5.07434C13.2133 4.4133 13.2133 4.4133 13.2133 4.4133L13.2146 4.41368L13.216 4.41408L13.219 4.41497L13.2261 4.41709L13.2443 4.42275C13.2581 4.42716 13.2754 4.43292 13.2959 4.44022C13.3371 4.45483 13.3915 4.47561 13.4583 4.50421C13.5918 4.56144 13.7743 4.64983 13.9984 4.78248C14.4471 5.04802 15.0596 5.4891 15.7792 6.20866C16.4987 6.92822 16.9398 7.54072 17.2053 7.9894C17.338 8.21353 17.4264 8.39601 17.4836 8.52955C17.5122 8.59629 17.533 8.65071 17.5476 8.69187C17.5549 8.71245 17.5607 8.72971 17.5651 8.74354L17.5707 8.76167L17.5728 8.76878L17.5737 8.77184L17.5741 8.77324C17.5741 8.77324 17.5745 8.77456 16.9135 8.96343L17.5745 8.77456C17.6788 9.13965 17.4674 9.52017 17.1023 9.62448C16.7404 9.7279 16.3632 9.52096 16.2551 9.16157L16.2518 9.15169C16.2469 9.13791 16.2368 9.1108 16.2198 9.07119C16.1859 8.99205 16.1244 8.86259 16.022 8.68971C15.8177 8.34437 15.4485 7.82256 14.8069 7.18093C14.1653 6.53931 13.6435 6.17016 13.2981 5.96577C13.1252 5.86346 12.9958 5.80195 12.9166 5.76804C12.877 5.75106 12.8499 5.74095 12.8361 5.73606L12.8263 5.73267C12.4669 5.62462 12.2599 5.24746 12.3633 4.88547Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.59146 4.03966C6.13153 2.4996 8.73041 2.61667 9.80274 4.53812L10.3977 5.60414C11.0979 6.85889 10.7995 8.44205 9.77441 9.47969C9.76075 9.49839 9.6884 9.60375 9.67938 9.78783C9.66788 10.0228 9.75133 10.5662 10.5932 11.4081C11.4348 12.2497 11.9781 12.3333 12.2132 12.3219C12.3974 12.3129 12.5029 12.2405 12.5216 12.2269C13.5592 11.2018 15.1424 10.9034 16.3971 11.6036L17.4632 12.1985C19.3846 13.2709 19.5017 15.8698 17.9616 17.4098C17.1378 18.2336 16.0425 18.9655 14.7553 19.0143C12.8478 19.0867 9.6805 18.594 6.54387 15.4574C3.40724 12.3208 2.91463 9.15348 2.98694 7.24596C3.03574 5.95877 3.76769 4.86343 4.59146 4.03966ZM8.60206 5.2082C8.05297 4.2243 6.57741 3.99826 5.56374 5.01193C4.853 5.72267 4.39094 6.50717 4.36096 7.29804C4.30065 8.88877 4.69339 11.6624 7.51614 14.4851C10.3389 17.3079 13.1125 17.7006 14.7032 17.6403C15.4941 17.6103 16.2786 17.1483 16.9893 16.4375C18.003 15.4239 17.777 13.9483 16.7931 13.3992L15.7271 12.8043C15.0639 12.4342 14.1325 12.5604 13.4786 13.2143C13.4144 13.2785 13.0055 13.66 12.28 13.6953C11.5373 13.7314 10.6383 13.3977 9.62095 12.3803C8.60326 11.3626 8.26966 10.4634 8.30603 9.72058C8.34155 8.99503 8.72309 8.58656 8.78693 8.52271C9.4408 7.86884 9.56708 6.93735 9.19699 6.27422L8.60206 5.2082Z"
                        fill="#3C50E0"
                      />
                    </svg>
                    Phone: (+233) 598 111 416
                  </p>

                  <p className="flex gap-4">
                    <svg
                      className="mt-0.5 shrink-0"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.89453 7.80506C3.89453 4.08157 7.12254 1.14581 10.9987 1.14581C14.8749 1.14581 18.1029 4.08157 18.1029 7.80506C18.1029 11.2986 15.9369 15.4 12.4423 16.8934C11.5248 17.2855 10.4726 17.2855 9.55514 16.8934C6.06051 15.4 3.89453 11.2986 3.89453 7.80506ZM10.9987 2.52081C7.7872 2.52081 5.26953 4.93234 5.26953 7.80506C5.26953 10.856 7.19951 14.3915 10.0955 15.629C10.6678 15.8736 11.3296 15.8736 11.9019 15.629C14.7979 14.3915 16.7279 10.856 16.7279 7.80506C16.7279 4.93234 14.2102 2.52081 10.9987 2.52081ZM10.9987 7.10415C10.3659 7.10415 9.85286 7.61715 9.85286 8.24998C9.85286 8.88281 10.3659 9.39581 10.9987 9.39581C11.6315 9.39581 12.1445 8.88281 12.1445 8.24998C12.1445 7.61715 11.6315 7.10415 10.9987 7.10415ZM8.47786 8.24998C8.47786 6.85776 9.60648 5.72915 10.9987 5.72915C12.3909 5.72915 13.5195 6.85776 13.5195 8.24998C13.5195 9.6422 12.3909 10.7708 10.9987 10.7708C9.60648 10.7708 8.47786 9.6422 8.47786 8.24998ZM3.29449 13.7469C3.54935 14.0283 3.52779 14.4631 3.24634 14.7179C2.72595 15.1891 2.51953 15.6402 2.51953 16.0416C2.51953 16.7417 3.18321 17.6044 4.79901 18.3315C6.35028 19.0296 8.54159 19.4791 10.9987 19.4791C13.4558 19.4791 15.6471 19.0296 17.1984 18.3315C18.8142 17.6044 19.4779 16.7417 19.4779 16.0416C19.4779 15.6402 19.2714 15.1891 18.7511 14.7179C18.4696 14.4631 18.448 14.0283 18.7029 13.7468C18.9578 13.4654 19.3925 13.4438 19.674 13.6987C20.3734 14.332 20.8529 15.126 20.8529 16.0416C20.8529 17.6198 19.4645 18.8196 17.7626 19.5854C15.9962 20.3803 13.6042 20.8541 10.9987 20.8541C8.3932 20.8541 6.00117 20.3803 4.23476 19.5854C2.53288 18.8196 1.14453 17.6198 1.14453 16.0416C1.14453 15.126 1.62399 14.332 2.32341 13.6987C2.60487 13.4438 3.03963 13.4654 3.29449 13.7469Z"
                        fill="#3C50E0"
                      />
                    </svg>
                    Address: 54 Boundary Road, 2nd floor, Shiashie-East Legon, Accra
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <form onSubmit={handleFormSubmit}>
                <p className="font-medium text-xl text-dark flex text-center justify-center mb-5 ">Submit your queries here</p>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block mb-2.5">
                      First Name <span className="text-red">*</span>
                    </label>

                    <input
                      required
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="John"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="lastName" className="block mb-2.5">
                      Last Name <span className="text-red">*</span>
                    </label>

                    <input
                      required
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Doe"
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="subject" className="block mb-2.5">
                      Subject
                    </label>

                    <input
                      required
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Type your subject"
                      onChange={(e) => setSubject(e.target.value)}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className="block mb-2.5">
                      email
                    </label>

                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <div className="mb-7.5">
                  <label htmlFor="message" className="block mb-2.5">
                    Message
                  </label>

                  <textarea
                    required
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Type your message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
