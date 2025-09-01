import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroA from "../../assets/WebsiteImage/heroA.jpg";
import { Modal, Button, Nav } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HeroSection() {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const translateX = -currentSlide * 100;

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        {/* Background Image with better positioning and lighter overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div>
          <img
            src={heroA}
            alt="Professional doctor providing compassionate medical care"
            className="w-full h-full object-cover object-center opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1 mb-6 text-xs">
              <i className="ri-map-pin-line text-emerald-600 mr-1"></i>
              <span className="font-semibold text-emerald-700">
                Available Australia-wide
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Australia's Most
              <span className="block text-indigo-600">
                Affordable & Trusted
              </span>
            </h1>
            <p className="text-start text-gray-700 text-sm sm:text-base mb-6">
              Simple, quick, and trusted medical certificates at your fingertips.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-700 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                <i className="ri-file-add-line mr-2"></i>
                Get Your Certificate Now
              </button>
              <button
                to="/verify"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 transition-all duration-300 cursor-pointer whitespace-nowrap text-center"
              >
                <i className="ri-qr-scan-line mr-2"></i>
                Verify certificate using QR code
              </button>
            </div>

            {/* Pricing Highlight */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">

              {/* Single-Day Certificate */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">$11.99</div>
                  <div className="text-emerald-600 font-semibold mb-1 text-sm">
                    Single-Day Certificate
                  </div>
                  <div className="text-xs font-bold text-gray-700 mb-4">
                    AHPRA Registered Practitioners
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2 rounded-full shadow-md transition-all">
                    Get Certificate
                  </button>
                </div>
              </div>

              {/* Multi-Day Certificate */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">$16.99</div>
                  <div className="text-indigo-700 font-semibold mb-1 text-sm">
                    Multi-Day (2-Day)
                  </div>
                  <div className="text-xs font-bold mb-4">
                    AHPRA Registered Practitioners
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2 rounded-full shadow-md transition-all">
                    Get Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Promise */}
            <div className="mt-8 bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-xl p-6 max-w-2xl shadow-lg">
              <div className="flex items-center">
                <i className="ri-time-line text-2xl text-amber-600 mr-4"></i>
                <div>
                  <div className="text-gray-900 font-bold text-lg">
                    Delivered within minutes
                  </div>
                  <div className="text-amber-700 text-xs mb-1">
                    Get your certificate in minutes
                  </div>
                  <div className="text-amber-600 text-xs">
                    Need support? Email: support@mediwishglobal.com.au
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ AHPRA Compliance Note */}
            <div className="mt-4 text-start text-gray-600 text-xs italic">
              All health practitioners are registered with the Australian Health Practitioner Regulation Agency (AHPRA).
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Affordable, Trusted & Transparent Healthcare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Supporting our community with Australia's most affordable services while maintaining the highest standards
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <i className="ri-shield-check-line text-2xl text-emerald-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                AHPRA Verified
              </h3>
              <p className="text-gray-600 text-sm">Registered Practitioners Only</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <i className="ri-money-dollar-circle-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Cost-effective
              </h3>
              <p className="text-gray-600 text-sm">Australia's most affordable</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <i className="ri-qr-code-line text-2xl text-pink-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Qr Code
              </h3>
              <p className="text-gray-600 text-sm">Verification certificate using Qr code</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <i className="ri-time-line text-2xl text-amber-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Delivered In Minutes
              </h3>
              <p className="text-gray-600 text-sm">Quick & reliable service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Certificate Types We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, affordable, and professionally issued certificates for all your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sick Leave Certificate */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <i className="ri-file-text-line text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Sick Leave Certificate
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm text-center">
                Medical certificate for personal illness. Required for sick leave from work or study. <strong>Issued by AHPRA-registered health practitioners within minutes.</strong>
              </p>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  From $11.99
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Single-day from AHPRA Registered Practitioners
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer text-sm">
                  Get Certificate
                </button>
              </div>
            </div>

            {/* Carer's Leave Certificate */}
            <div className="bg-indigo-50 p-6 rounded-2xl shadow-xl border-2 border-indigo-200 hover:shadow-2xl transition-all duration-300 md:scale-105 z-10 relative">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <i className="ri-parent-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Carer's Leave Certificate
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm text-center">
                Certificate for caring for sick family members. Essential for carer's leave entitlements. <strong>Professionally assessed and issued by AHPRA-registered practitioners.</strong>
              </p>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  From $11.99
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Single-day from AHPRA Registered Practitioners
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer text-sm">
                  Get Certificate
                </button>
              </div>
            </div>

            {/* Student Sick Leave Certificate */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <i className="ri-graduation-cap-line text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Student Sick Leave Certificate
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm text-center">
                Special student certificates for educational institutions. Covers illness-related absences from school, university, or training courses. <strong>Issued promptly by AHPRA-registered health professionals.</strong>
              </p>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-2">
                  From $11.99
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Single-day from AHPRA Registered Practitioners
                </div>
                <button className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors cursor-pointer text-sm">
                  Get Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-10 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Clean%20modern%20medical%20office%20interior%20with%20professional%20healthcare%20equipment%2C%20bright%20medical%20consultation%20room%20with%20examination%20table%20and%20computer%2C%20organized%20medical%20facility%20with%20professional%20lighting%2C%20Australian%20medical%20clinic%20interior%20design%2C%20sterile%20healthcare%20environment%20with%20modern%20medical%20technology&width=1400&height=800&seq=medical-office-bg-001&orientation=landscape"
            alt="Professional medical office interior"
            className="w-full h-full object-cover object-center opacity-10"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-900 border border-emerald-700 rounded-full px-4 py-2 mb-6 text-xs">
              <i className="ri-money-dollar-circle-line text-emerald-400 mr-1"></i>
              <span className="font-semibold text-emerald-300">
                Affordable & Transparent Pricing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Among the most affordable in Australia
              <span className="block text-indigo-400 text-xl sm:text-2xl md:text-3xl mt-2">
                great care at a fair price
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trusted healthcare at fair prices. No hidden fees, no surprises – just
              honest, transparent healthcare pricing. All certificates are issued by
              AHPRA-registered health practitioners.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Single Day Pricing */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <i className="ri-calendar-line text-white text-2xl"></i>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Single-Day Certificate
                  </h3>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl sm:text-4xl font-bold text-emerald-400">
                      $11.99
                    </span>
                    <span className="text-emerald-300 ml-1 text-sm">AUD</span>
                  </div>
                  <p className="text-emerald-200 text-sm">
                    Affordable, professional care
                  </p>
                </div>

                {/* Bullet List */}
                <ul className="space-y-3 text-gray-200 mb-8 text-sm text-left max-w-xs mx-auto">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="">Certified by AHPRA Registered Practitioners</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span>1-day duration coverage</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span>Email delivery</span>
                  </li>
                </ul>

                <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl text-base font-semibold hover:bg-emerald-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                  <i className="ri-shopping-cart-line mr-1"></i>
                  Get Single-Day Certificate
                </button>
              </div>
            </div>

            {/* Multi-Day Pricing */}
            <div className="bg-indigo-600/20 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-indigo-400/50 hover:bg-indigo-600/25 transition-all duration-500 relative">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <i className="ri-calendar-2-line text-2xl text-white"></i>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Multi-Day (2-Day) Certificate
                  </h3>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl sm:text-4xl font-bold text-indigo-400">
                      $16.99
                    </span>
                    <span className="text-indigo-300 ml-1 text-sm">AUD</span>
                  </div>
                  <p className="text-indigo-200 text-sm">
                    Extended coverage with professional assessment
                  </p>
                </div>

                {/* Bullet List */}
                <ul className="space-y-3 text-gray-200 mb-8 text-sm text-left max-w-xs mx-auto">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="">Certified by AHPRA Registered Practitioners</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span>2-day duration coverage</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span>Email delivery</span>
                  </li>
                </ul>

                <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl text-base font-semibold hover:bg-indigo-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                  <i className="ri-star-line mr-1"></i>
                  Get Multi-Day Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value & Transparency Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 w-20 h-20 bg-indigo-200/30 rounded-full"></div>
          <div className="absolute bottom-16 right-10 w-24 h-24 bg-emerald-200/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-amber-200/30 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Value Comparison Slider */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Value Comparison
              </h3>
              <p className="text-gray-600 text-base">
                See how we deliver maximum value compared to traditional options
              </p>
            </div>

            {/* Slider Container */}
            <div className="relative">
              {/* Slider Wrapper */}
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(${translateX}%)` }}
                >
                  {/* Slide 1: Traditional GP Visit */}
                  <div className="w-full flex-shrink-0 px-3">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center relative overflow-hidden hover:shadow-lg transition-all duration-300 mx-auto max-w-sm">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-red-200/30 rounded-full -mr-8 -mt-8"></div>
                      <div className="relative">
                        <div className="mb-4">
                          <img
                            src="https://readdy.ai/api/search-image?query=Professional%20medical%20clinic%20interior%20with%20doctor%20examining%20patient%2C%20traditional%20healthcare%20setting%20with%20white%20coat%20doctor%20and%20stethoscope%2C%20expensive%20private%20medical%20consultation%20room%2C%20formal%20medical%20environment%20with%20examination%20table%20and%20medical%20equipment%2C%20high-end%20healthcare%20facility&width=300&height=200&seq=traditional-gp-001&orientation=landscape"
                            alt="Traditional GP clinic visit"
                            className="w-full h-24 object-cover object-center rounded-lg shadow-md mb-3"
                          />
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto">
                            <i className="ri-hospital-line text-red-600 text-xl"></i>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                          Traditional GP Visit
                        </h4>
                        <p className="text-gray-600 mb-4 text-xs leading-relaxed">
                          Visit physical clinic, wait for hours, pay high consultation fees, and deal with appointment scheduling difficulties.
                        </p>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-center">
                            <i className="ri-time-line text-red-500 mr-1"></i>
                            <span>2-3 hour wait time</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <i className="ri-car-line text-red-500 mr-1"></i>
                            <span>Travel to clinic required</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <i className="ri-calendar-line text-red-500 mr-1"></i>
                            <span>Limited appointment slots</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2: MediWish Online */}
                  <div className="w-full flex-shrink-0 px-3">
                    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center relative overflow-hidden hover:shadow-lg transition-all duration-300 mx-auto max-w-sm">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          <i className="ri-star-line mr-1"></i>
                          OUR SERVICE
                        </span>
                      </div>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/30 rounded-full -mr-8 -mt-8"></div>
                      <div className="relative">
                        <div className="mb-4 mt-1">
                          <img
                            src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20showing%20digital%20medical%20certificate%20app%20interface%2C%20person%20relaxing%20at%20home%20using%20online%20healthcare%20service%2C%20comfortable%20home%20environment%20with%20laptop%20and%20mobile%20device%2C%20digital%20health%20technology%2C%20convenient%20online%20medical%20consultation%20from%20couch&width=300&height=200&seq=mediwish-online-001&orientation=landscape"
                            alt="MediWish online service from home"
                            className="w-full h-24 object-cover object-center rounded-lg shadow-md mb-3"
                          />
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                            <i className="ri-smartphone-line text-green-600 text-xl"></i>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                          MediWish Online
                        </h4>
                        <p className="text-gray-600 mb-4 text-xs leading-relaxed">
                          Complete everything from home comfort. Fast, affordable, and professionally issued certificates by registered practitioners.
                        </p>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-center">
                            <i className="ri-time-line text-green-600 mr-1"></i>
                            <span>30 minute delivery</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <i className="ri-home-line text-green-600 mr-1"></i>
                            <span>Complete from home</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3: Walk-in Clinic */}
                  <div className="w-full flex-shrink-0 px-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center relative overflow-hidden hover:shadow-lg transition-all duration-300 mx-auto max-w-sm">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full -mr-8 -mt-8"></div>
                      <div className="relative">
                        <div className="mb-4">
                          <img
                            src="https://readdy.ai/api/search-image?query=Busy%20walk-in%20medical%20clinic%20waiting%20room%20with%20patients%20sitting%20and%20waiting%2C%20crowded%20healthcare%20facility%20with%20long%20queues%2C%20medical%20center%20reception%20area%20with%20multiple%20people%20waiting%20for%20service%2C%20clinical%20healthcare%20environment%20with%20waiting%20chairs&width=300&height=200&seq=walkin-clinic-001&orientation=landscape"
                            alt="Walk-in clinic waiting room"
                            className="w-full h-24 object-cover object-center rounded-lg shadow-md mb-3"
                          />
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                            <i className="ri-building-2-line text-blue-600 text-xl"></i>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                          Walk-in Clinic
                        </h4>
                        <p className="text-gray-600 mb-4 text-xs leading-relaxed">
                          No appointments needed but long wait times expected. Moderate pricing but limited weekend availability.
                        </p>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-center">
                            <i className="ri-time-line text-blue-500 mr-1"></i>
                            <span>1-4 hour wait time</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <i className="ri-calendar-close-line text-blue-500 mr-1"></i>
                            <span>Weekend availability limited</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <i className="ri-gas-station-line text-blue-500 mr-1"></i>
                            <span>Additional travel costs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentSlide(
                    currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer z-10"
              >
                <i className="ri-arrow-left-s-line text-xl text-gray-600"></i>
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((currentSlide + 1) % totalSlides)
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer z-10"
              >
                <i className="ri-arrow-right-s-line text-xl text-gray-600"></i>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index
                    ? "bg-indigo-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-10 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 max-w-3xl mx-auto">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mr-6">
                    <i className="ri-trophy-line text-emerald-600 text-2xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl font-bold text-emerald-800 mb-2">
                      Professional Medical Certificates
                    </h4>
                    <p className="text-emerald-700">
                      Registered practitioners ensuring quality healthcare
                      solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modal (Tailwind with Blur Background & Full Form) */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowModal(false)} // overlay click se close hoga
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative 
                  max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // modal ke andar click se close na ho
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Apply for Medical Certificate
            </h2>

            {/* Form */}
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <textarea
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                ></textarea>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Symptoms
                </label>
                <textarea
                  placeholder="Enter your symptoms"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                ></textarea>
              </div>

              {/* Symptoms Duration */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Symptoms Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 days, 1 week"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Certificate Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Certificate Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="">Select Type</option>
                  <option value="sick">Sick Leave</option>
                  <option value="fitness">Fitness Certificate</option>
                  <option value="travel">Travel Certificate</option>
                </select>
              </div>

              {/* Certificate Single / Multiple */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Certificate Option
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="certificateOption"
                      value="single"
                    />
                    <span>Single</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="certificateOption"
                      value="multiple"
                    />
                    <span>Multiple</span>
                  </label>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <span className="text-indigo-600 underline">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}