import clsx from "clsx";

const Logo = ({ className, size = 228 }) => {
  return (
    <svg
      width={size}
      viewBox='0 0 228 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx("h-auto", className)}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.00003 10.2866C5.04486 11.8781 5.46168 13.3766 6.16665 14.6982C5.8068 14.7172 5.45958 14.7288 5.12611 14.7332C3.71546 14.7515 2.59232 14.6378 1.81232 14.4165C0.979599 14.1802 0.780008 13.8965 0.747227 13.7728C0.714444 13.6491 0.747428 13.3038 1.35401 12.6865C1.92218 12.1083 2.84183 11.4539 4.07668 10.7719C4.36914 10.6104 4.67726 10.4485 5.00003 10.2866ZM25.9233 9.2279C25.6309 9.38941 25.3228 9.55136 25 9.71318C24.9552 8.12171 24.5384 6.62327 23.8334 5.30166C24.1933 5.28266 24.5405 5.27099 24.8739 5.26665C26.2846 5.24831 27.4077 5.36199 28.1877 5.58333C29.0204 5.81963 29.22 6.10329 29.2528 6.22703C29.2856 6.35077 29.2526 6.696 28.646 7.3133C28.0778 7.89151 27.1582 8.54594 25.9233 9.2279ZM29.9436 6.04417C29.626 4.84547 27.1003 4.37194 23.4279 4.60976C21.6495 1.83721 18.5394 -0.00012207 15 -0.00012207C9.64763 -0.00012207 5.27698 4.20155 5.00901 9.48522C1.69955 11.0956 -0.261154 12.7568 0.0564459 13.9557C0.374013 15.1544 2.89979 15.6279 6.57223 15.3901C6.58529 15.4104 6.59842 15.4307 6.61163 15.451C9.26737 15.1905 12.4425 14.6123 15.8101 13.7209C19.332 12.7886 22.5012 11.6627 24.9905 10.524C24.9907 10.5208 24.9909 10.5177 24.991 10.5146C28.3005 8.90426 30.2612 7.243 29.9436 6.04417ZM24.7637 12.1886C22.3284 13.2402 19.3846 14.253 16.1761 15.1024C13.1172 15.9121 10.194 16.4736 7.64318 16.7764C9.47119 18.7584 12.0906 19.9999 15 19.9999C19.773 19.9999 23.7652 16.6587 24.7637 12.1886Z'
        className='fill-[currentColor]'
      />
      <path
        d='M218.034 9.935C218.697 9.961 220.309 9.974 221.999 9.974C223.715 9.974 224.443 9.389 224.443 8.362C224.443 7.179 223.728 6.828 221.895 6.828C221.141 6.828 219.074 6.841 218.047 6.88C218.034 7.92 218.034 8.96 218.034 9.935ZM223.793 10.845V10.884C225.418 11.066 226.042 11.469 226.549 12.886C226.861 13.783 227.095 14.498 227.277 14.875H225.197C224.781 14.875 224.729 14.745 224.482 13.848C223.858 12.002 223.611 11.586 221.83 11.586H218.047C218.073 12.912 218.112 14.069 218.19 14.875H215.837C215.85 13.458 215.876 12.093 215.876 10C215.876 7.933 215.863 6.529 215.837 5.125H222.454C225.145 5.125 226.614 6.009 226.614 8.024C226.614 9.662 225.743 10.572 223.793 10.845Z'
        className='fill-[currentColor]'
      />
      <path
        d='M201.904 5.125H211.992C211.979 5.32 211.979 5.671 211.979 5.944C211.979 6.23 211.979 6.62 211.992 6.828C209.483 6.802 206.246 6.789 204.205 6.789V9.181C206.649 9.181 209.847 9.181 211.849 9.155C211.836 9.519 211.836 10.351 211.836 10.741C209.86 10.715 206.636 10.689 204.205 10.689V13.12C206.259 13.12 209.587 13.107 211.992 13.081C211.979 13.302 211.979 13.692 211.979 14.004C211.979 14.277 211.979 14.654 211.992 14.875H201.904C201.956 13.614 201.956 12.08 201.956 10C201.956 7.933 201.956 6.334 201.904 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M189.447 9.935C190.11 9.961 191.721 9.974 193.411 9.974C195.127 9.974 195.855 9.389 195.855 8.362C195.855 7.179 195.141 6.828 193.308 6.828C192.554 6.828 190.487 6.841 189.46 6.88C189.447 7.92 189.447 8.96 189.447 9.935ZM195.206 10.845V10.884C196.831 11.066 197.455 11.469 197.962 12.886C198.274 13.783 198.507 14.498 198.689 14.875H196.61C196.194 14.875 196.142 14.745 195.895 13.848C195.271 12.002 195.024 11.586 193.243 11.586H189.46C189.486 12.912 189.525 14.069 189.603 14.875H187.25C187.263 13.458 187.288 12.093 187.288 10C187.288 7.933 187.276 6.529 187.25 5.125H193.867C196.558 5.125 198.027 6.009 198.027 8.024C198.027 9.662 197.156 10.572 195.206 10.845Z'
        className='fill-[currentColor]'
      />
      <path
        d='M183.842 9.93499C183.842 13.224 181.645 15.135 177.524 15.135C173.416 15.135 171.232 13.224 171.232 9.93499C171.232 6.60699 173.559 4.86499 177.524 4.86499C181.502 4.86499 183.842 6.60699 183.842 9.93499ZM177.537 13.25C180.228 13.25 181.567 12.119 181.567 9.97399C181.567 7.82899 180.215 6.74999 177.537 6.74999C174.859 6.74999 173.494 7.81599 173.494 9.97399C173.494 12.119 174.846 13.25 177.537 13.25Z'
        className='fill-[currentColor]'
      />
      <path
        d='M160.731 5.125H163.058C163.019 5.905 162.993 7.738 162.98 9.987C162.98 11.001 162.98 12.119 162.993 12.951C164.709 12.951 167.153 12.964 169.129 12.912C169.116 13.224 169.116 13.562 169.116 13.887C169.116 14.225 169.116 14.55 169.129 14.875H160.731C160.731 13.939 160.77 12.08 160.77 10C160.77 7.699 160.77 6.061 160.731 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M152.609 10.533C154.585 10.533 155.326 10.039 155.326 8.7C155.326 7.335 154.533 6.867 152.674 6.867C151.933 6.867 150.022 6.88 149.073 6.906C149.073 8.167 149.073 9.389 149.073 10.507C149.697 10.507 151.127 10.533 152.609 10.533ZM146.798 5.125H153.077C155.885 5.125 157.523 5.983 157.523 8.674C157.523 11.209 155.937 12.301 153.038 12.301C151.686 12.301 150.815 12.301 149.099 12.249C149.112 13.276 149.138 14.173 149.19 14.875H146.798C146.85 13.471 146.85 12.08 146.85 10C146.85 7.933 146.85 6.464 146.798 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M141.091 5.125H143.808C142.729 6.295 141.208 8.128 139.7 9.987C141.26 11.794 142.937 13.718 143.977 14.875H140.948C140.376 14.095 139.765 13.406 138.959 12.418C138.491 11.833 138.088 11.326 137.789 10.871C137.477 11.339 137.061 11.859 136.593 12.418C135.787 13.406 135.202 14.108 134.669 14.875H131.874C132.862 13.796 134.552 11.781 136.125 9.935C134.63 8.141 133.187 6.399 132.082 5.125H135.033C135.618 5.957 136.359 6.867 137.126 7.777C137.516 8.258 137.841 8.635 138.101 8.999C138.348 8.635 138.621 8.284 139.011 7.803C139.869 6.737 140.493 5.957 141.091 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M119.164 5.125H129.252C129.239 5.32 129.239 5.671 129.239 5.944C129.239 6.23 129.239 6.62 129.252 6.828C126.743 6.802 123.506 6.789 121.465 6.789V9.181C123.909 9.181 127.107 9.181 129.109 9.155C129.096 9.519 129.096 10.351 129.096 10.741C127.12 10.715 123.896 10.689 121.465 10.689V13.12C123.519 13.12 126.847 13.107 129.252 13.081C129.239 13.302 129.239 13.692 129.239 14.004C129.239 14.277 129.239 14.654 129.252 14.875H119.164C119.216 13.614 119.216 12.08 119.216 10C119.216 7.933 119.216 6.334 119.164 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M98.7394 5.125H108.827C108.814 5.32 108.814 5.671 108.814 5.944C108.814 6.23 108.814 6.62 108.827 6.828C106.318 6.802 103.081 6.789 101.04 6.789V9.181C103.484 9.181 106.682 9.181 108.684 9.155C108.671 9.519 108.671 10.351 108.671 10.741C106.695 10.715 103.471 10.689 101.04 10.689V13.12C103.094 13.12 106.422 13.107 108.827 13.081C108.814 13.302 108.814 13.692 108.814 14.004C108.814 14.277 108.814 14.654 108.827 14.875H98.7394C98.7914 13.614 98.7914 12.08 98.7914 10C98.7914 7.933 98.7914 6.334 98.7394 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M92.918 9.12899V8.90799C92.918 7.42599 91.748 6.78899 89.291 6.78899C86.769 6.81499 85.391 7.68599 85.391 9.89599C85.391 12.132 86.834 13.159 89.395 13.159C91.943 13.159 92.931 12.392 92.931 11.066V10.793C93.308 10.806 93.659 10.806 94.036 10.806C94.413 10.806 94.79 10.806 95.154 10.793C95.154 10.936 95.167 11.053 95.167 11.196C95.167 13.51 93.607 15.057 89.408 15.057C85.352 15.057 83.103 13.432 83.103 9.94799C83.103 6.58099 85.469 4.94299 89.343 4.94299C93.165 4.94299 95.128 6.22999 95.128 8.59599C95.128 8.77799 95.128 8.94699 95.115 9.12899C94.751 9.11599 94.374 9.11599 94.01 9.11599C93.633 9.11599 93.282 9.11599 92.918 9.12899Z'
        className='fill-[currentColor]'
      />
      <path
        d='M74.87 11.157C75.52 11.157 76.417 11.157 77.249 11.144C76.755 10.117 76.248 9.051 75.819 8.18C75.39 7.348 75.117 6.75 74.909 6.295C74.701 6.75 74.415 7.348 73.999 8.219C73.583 9.09 73.076 10.13 72.595 11.144C73.401 11.157 74.259 11.157 74.87 11.157ZM81.669 14.875H78.913C78.796 14.524 78.432 13.718 77.99 12.73C76.872 12.717 75.754 12.717 74.87 12.717C74.077 12.717 72.907 12.717 71.828 12.73C71.386 13.666 71.009 14.459 70.84 14.875H68.279C69.631 12.496 72.569 6.633 73.258 5.125H76.612C77.405 6.75 80.226 12.379 81.669 14.875Z'
        className='fill-[currentColor]'
      />
      <path
        d='M62.2976 10.533C64.2736 10.533 65.0146 10.039 65.0146 8.7C65.0146 7.335 64.2216 6.867 62.3626 6.867C61.6216 6.867 59.7106 6.88 58.7616 6.906C58.7616 8.167 58.7616 9.389 58.7616 10.507C59.3856 10.507 60.8156 10.533 62.2976 10.533ZM56.4866 5.125H62.7656C65.5736 5.125 67.2116 5.983 67.2116 8.674C67.2116 11.209 65.6256 12.301 62.7266 12.301C61.3746 12.301 60.5036 12.301 58.7876 12.249C58.8006 13.276 58.8266 14.173 58.8786 14.875H56.4866C56.5386 13.471 56.5386 12.08 56.5386 10C56.5386 7.933 56.5386 6.464 56.4866 5.125Z'
        className='fill-[currentColor]'
      />
      <path
        d='M44.249 11.5599V11.8199C44.249 12.9249 45.133 13.3669 47.59 13.3669C50.125 13.3669 50.801 12.9509 50.801 12.1579C50.801 11.3519 50.242 10.9619 47.213 10.7539C43.222 10.4679 42.143 9.54493 42.143 7.78993C42.143 5.99593 43.677 4.90393 47.382 4.90393C51.321 4.90393 52.712 5.81393 52.712 7.76393C52.712 7.97193 52.712 8.16693 52.699 8.38793C52.452 8.37493 52.049 8.36193 51.646 8.36193C51.23 8.36193 50.814 8.37493 50.567 8.38793C50.58 8.25793 50.58 8.10193 50.58 7.99793C50.58 7.06193 49.943 6.58093 47.33 6.58093C45.029 6.58093 44.353 6.98393 44.353 7.71193C44.353 8.38793 44.73 8.81693 47.967 9.06393C51.737 9.37593 52.972 10.1689 52.972 12.0669C52.972 14.0299 51.451 15.0959 47.616 15.0959C43.625 15.0959 42 14.1599 42 12.1969C42 11.9759 42 11.7679 42.026 11.5339C42.312 11.5729 42.715 11.5859 43.118 11.5859C43.547 11.5859 43.95 11.5859 44.249 11.5599Z'
        className='fill-[currentColor]'
      />
    </svg>
  );
};

export default Logo;
