with import <nixpkgs> { };
stdenv.mkDerivation {
  name = "env";
  nativeBuildInputs = [ pkg-config ];
  buildInputs = [
    libuuid # canvas
  ];

  # workaround for npm dep compilation
  # https://github.com/imagemin/optipng-bin/issues/108
  shellHook = ''
    LD=$CC
    npm install
    nix-shell run.nix
  '';
}