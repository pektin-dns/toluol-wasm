# FROM archlinux
# RUN useradd arch -m ;  passwd -d arch ; printf 'arch ALL=(ALL) ALL\n' | tee -a /etc/sudoers
# RUN pacman -Sy --needed git base-devel --noconfirm; git clone https://aur.archlinux.org/yay.git ; cd yay  ; su arch -c "makepkg -si"
# RUN pacman -Sy binaryen wasm-pack --noconfirm
FROM rust:alpine
RUN apk add musl-dev openssl-dev gcc curl git npm gcc ca-certificates libc6-compat binaryen
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh