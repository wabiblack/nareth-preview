extends CharacterBody2D

@export var speed: float = 190.0

@onready var sprite: Sprite2D = $Sprite

var bob_clock: float = 0.0

func _physics_process(delta: float) -> void:
	var input_dir: Vector2 = Vector2.ZERO
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT):
		input_dir.x -= 1.0
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT):
		input_dir.x += 1.0
	if Input.is_key_pressed(KEY_W) or Input.is_key_pressed(KEY_UP):
		input_dir.y -= 1.0
	if Input.is_key_pressed(KEY_S) or Input.is_key_pressed(KEY_DOWN):
		input_dir.y += 1.0

	input_dir = input_dir.normalized()
	velocity = input_dir * speed
	move_and_slide()

	position.x = clampf(position.x, 36.0, 1564.0)
	position.y = clampf(position.y, 56.0, 860.0)

	if input_dir != Vector2.ZERO:
		if absf(input_dir.x) > 0.05:
			sprite.flip_h = input_dir.x < 0.0
		bob_clock += delta * 11.0
		sprite.position.y = -1.5 if sin(bob_clock) > 0.0 else 0.0
	else:
		bob_clock = 0.0
		sprite.position.y = 0.0
