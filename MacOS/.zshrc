# Setting PATH for Proxy
export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7897
alias proxy="export HTTPS_PROXY=$https_proxy"


# Setting PATH for Java
export JAVA8_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export JAVA17_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export JAVA21_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
export JAVA_HOME=$JAVA_HOME
alias jdk8="export JAVA_HOME=$JAVA8_HOME"
alias jdk11="export JAVA_HOME=$JAVA11_HOME"
alias jdk17="export JAVA_HOME=$JAVA17_HOME"
alias jdk21="export JAVA_HOME=$JAVA21_HOME"

alias jdk="export JAVA_HOME=$JAVA_HOME"


# Setting PATH for Maven
export M2_HOME=/Users/huangchao/Soft/apache-maven
export PATH="${M2_HOME}/bin:${PATH}"


# Setting PATH for Python 3.13
# The original version is saved in .zprofile.pysave
export PATH="/Library/Frameworks/Python.framework/Versions/3.13/bin:${PATH}"
alias python="/Library/Frameworks/Python.framework/Versions/3.13/bin/python3"
alias pip="/Library/Frameworks/Python.framework/Versions/3.13/bin/pip3"


# Redis
export PATH="/opt/homebrew/bin:${PATH}"


# Added by Toolbox App
export PATH="$PATH:/Users/huangchao/Library/Application Support/JetBrains/Toolbox/scripts"


# pnpm
export PNPM_HOME="/Users/huangchao/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
___MY_VMOPTIONS_SHELL_FILE="${HOME}/.jetbrains.vmoptions.sh"; if [ -f "${___MY_VMOPTIONS_SHELL_FILE}" ]; then . "${___MY_VMOPTIONS_SHELL_FILE}"; fi

# bun completions
[ -s "/Users/huangchao/.bun/_bun" ] && source "/Users/huangchao/.bun/_bun"


# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

. "$HOME/.local/bin/env"
