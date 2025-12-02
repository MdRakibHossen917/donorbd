import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Logo = ({ className = "", showTagline = true, size = "default" }) => {
  const { t } = useLanguage()

  const logoSize = size === "small" ? "w-8 h-8" : size === "large" ? "w-16 h-16" : "w-10 h-10 sm:w-12 sm:h-12"
  const textSize = size === "small" ? "text-lg" : size === "large" ? "text-3xl" : "text-xl sm:text-2xl"
  const taglineSize = size === "small" ? "text-[10px]" : size === "large" ? "text-sm" : "text-xs"

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Image - Heart with Blood Drop and Hands */}
      <div className={`${logoSize} flex items-center justify-center flex-shrink-0`}>
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Heart Shape with Blood Drop and Hands */}
          <g transform="translate(4, 4)">
            {/* Blood Drop (Left side - Solid Red #C82027) */}
            <path 
              d="M 8 20 C 8 12, 12 8, 16 10 C 18 11, 20 13, 20 20 C 20 26, 18 30, 16 32 L 12 34 C 10 34, 8 32, 8 28 Z" 
              fill="#C82027" 
              className="dark:fill-[#C82027]"
            />
            
            {/* Lighter Salmon-Pink Ribbon (Right side - #E8706B) */}
            <path 
              d="M 20 10 C 22 8, 24 9, 26 11 C 28 13, 29 16, 28 19 C 27 22, 25 24, 22 25 C 20 25, 20 23, 20 20 C 20 17, 20 14, 20 12 Z" 
              fill="#E8706B" 
              opacity="0.9"
              className="dark:opacity-100"
            />
            
            {/* Multiple Hands inside the heart space (darker red/pink #D45A5A) */}
            <g transform="translate(22, 16)" opacity="0.9">
              <path d="M 2 8 L 3 6 L 4 7 L 4 10 L 2 10 Z" fill="#D45A5A" />
              <path d="M 3 6 L 4 4 L 5 5 L 5 7 L 3 7 Z" fill="#D45A5A" />
              <path d="M 6 4 L 7 3 L 8 4 L 8 7 L 6 7 Z" fill="#D45A5A" />
              <path d="M 7 3 L 8 1 L 9 2 L 9 4 L 7 4 Z" fill="#D45A5A" />
              <path d="M 1 5 L 2 4 L 3 5 L 3 8 L 1 8 Z" fill="#D45A5A" />
              <path d="M 4 9 L 5 8 L 6 9 L 6 12 L 4 12 Z" fill="#D45A5A" />
              <path d="M 5 8 L 6 6 L 7 7 L 7 9 L 5 9 Z" fill="#D45A5A" />
              <path d="M 8 6 L 9 5 L 10 6 L 10 9 L 8 9 Z" fill="#D45A5A" />
              <path d="M 5 11 L 6 10 L 7 11 L 7 14 L 5 14 Z" fill="#D45A5A" />
              <path d="M 7 8 L 8 7 L 9 8 L 9 11 L 7 11 Z" fill="#D45A5A" />
            </g>
          </g>
        </svg>
      </div>
      
      {/* Text Logo - Desktop */}
      {size !== "small" && (
        <div className="hidden sm:block">
          <h1 className={`${textSize} font-bold text-[#C82027] dark:text-[#C82027]`}>
            Donor<span className="text-[#C82027] dark:text-[#C82027]">BD</span>
          </h1>
          {showTagline && (
            <p className={`${taglineSize} text-[#E8706B] dark:text-[#E8706B] -mt-1`}>
              {t('tagline')}
            </p>
          )}
        </div>
      )}
      
      {/* Text Logo - Mobile */}
      {size !== "small" && (
        <div className="sm:hidden">
          <h1 className={`${size === "large" ? "text-xl" : "text-lg"} font-bold text-[#C82027] dark:text-[#C82027]`}>
            Donor<span className="text-[#C82027] dark:text-[#C82027]">BD</span>
          </h1>
        </div>
      )}
    </Link>
  )
}

export default Logo

