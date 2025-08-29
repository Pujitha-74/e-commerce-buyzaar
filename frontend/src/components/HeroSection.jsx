
import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Star, Truck, Shield, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
          {
        id: 1,
        title: "Experience products like never before with our immersive 3D shopping platform. Explore, interact, and discover amazing products in stunning detail.",
        highlight: "Shopping",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        id: 2,
        title: "Premium quality products from world-renowned brands. Quality guaranteed with every purchase.",
        highlight: "Quality",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        id: 3,
        title: "Fast and secure delivery with free shipping on orders over $50. Your satisfaction is our priority.",
        highlight: "Delivery",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
  ];

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#1E293B] to-[#334155]">
      {/* Dynamic Background Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Midnight Luxury Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B1426]/80 via-[#1E293B]/70 to-[#334155]/60"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-white drop-shadow-lg">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-1000 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <div className="space-y-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-white font-medium leading-relaxed max-w-lg drop-shadow-lg">
                      {slide.title}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="group bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-[#2563EB] hover:to-[#0891B2] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-2xl">
                  Start Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white hover:text-[#0B1426] transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
                  <ShoppingBag className="w-4 h-4" />
                  View Categories
                </button>
              </div>
            </div>

            {/* Right Content - Interactive Slider */}
            <div className="relative">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 overflow-hidden">
                {/* Slider Navigation */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={toggleAutoPlay}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>

                {/* Slide Content */}
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="h-full flex items-center justify-center p-6 lg:p-8">
                      <div className="text-center space-y-4">
                                                 <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-full mx-auto animate-bounce-slow flex items-center justify-center shadow-2xl">
                           <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                         </div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">{slide.highlight}</div>
                        <div className="text-white text-sm sm:text-base max-w-xs mx-auto drop-shadow-lg">
                          Experience products like never before with our immersive 3D shopping platform.
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-8 right-8 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 left-8 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
              </div>

              {/* Slider Controls */}
              <div className="flex justify-center mt-4 lg:mt-6 space-x-2 lg:space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#3B82F6] scale-125 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all z-20"
      >
        <ChevronLeft size={20} className="text-white sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all z-20"
      >
        <ChevronRight size={20} className="text-white sm:w-6 sm:h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
