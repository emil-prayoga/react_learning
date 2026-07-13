function Button({ href, variant, children, onClick   }) {
    const styles ={
        primary:"inline-flex items-center gap-2 rounded-full  px-6 py-3 font-semibold bg-blue-500 text-white shadow-[0_18px_45px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-400",
        secondary:"inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-200"
    }
    return (
        <a href={href}  onClick={onClick} className={styles[variant]}>
            {children}
        </a>
    );
}
export default Button